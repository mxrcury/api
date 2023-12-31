import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

import { CacheService } from '@core/cache'
import { FileCompressor, InjectGzipCompression } from '@core/file-compressor'
import { MailService } from '@core/mail'
import { APPWRITE_STORAGE, AZURE_STORAGE, FIREBASE_STORAGE, FileService, IFile, LOCAL_STORAGE, S3_STORAGE } from "@libs/file-storage"
import { PrismaService } from '@libs/prisma'
import { TokenService } from '@modules/token/token.service'

import {
  ConfirmationCodePayload,
  InvitationTokenPayload
} from './auth.interface'
import { InviteDto } from './dto/invite.dto'
import { SendMailDto } from './dto/send-mail.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly cacheStorage: CacheService,

    @Inject(S3_STORAGE) private readonly fileService: FileService,
    @Inject(LOCAL_STORAGE) private readonly localFileService: FileService,
    @Inject(FIREBASE_STORAGE) private readonly firebaseFileService: FileService,
    @Inject(AZURE_STORAGE) private readonly azureFileService: FileService,
    @Inject(APPWRITE_STORAGE) private readonly appwriteFileService: FileService,

    @InjectGzipCompression() private readonly gzipCompressorService: FileCompressor
  ) { }

  async signUp(dto: SignUpDto) {
    const { email, name, password, token, confirmationCode } = dto

    const isExistingUser = await this.prismaService.user.findFirst({
      where: { email }
    })

    if (isExistingUser) {
      throw new BadRequestException('User with such email already exists')
    }

    if (!confirmationCode) {
      const code = this.tokenService.generateRandomToken(6)

      await this.sendMail({
        title: 'Authorization code',
        subject: 'Authorization code',
        to: email,
        text: `Your authorization code is ${code}`,
        html: `<div><p>Your authorization code is <b>${code}</b></p></div>`
      })

      await this.cacheStorage.set(
        code,
        { confirmationCode: code, email },
        60 * 60 * 5
      )

      return {
        message: 'Confirmation code for authorizing was sent to your email'
      }
    } else {
      const isExistingCode =
        await this.cacheStorage.get<ConfirmationCodePayload>(confirmationCode)

      if (!isExistingCode && isExistingCode?.email !== email) {
        throw new BadRequestException(
          'Such confirmation code does not exist or was expired'
        )
      }
    }

    const hashSalt = await genSalt(10)
    const hashedPassword = await hash(password, hashSalt)

    const user = {
      email,
      name,
      password: hashedPassword,
      roleName: 'GUEST'
    }

    if (token) {
      const isExistingTokenInvite =
        await this.cacheStorage.get<InvitationTokenPayload>(token)

      if (isExistingTokenInvite) {
        const role = await this.prismaService.role.findFirst({
          where: { name: isExistingTokenInvite.role.toUpperCase() }
        })

        if (!role) {
          throw new BadRequestException(
            'Such role for invitation does not exists'
          )
        }
        await this.prismaService.user.create({
          data: { ...user, roleName: role.name }
        })

        return
      }
    }

    await this.prismaService.user.create({
      data: user
    })
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto

    const isExistingUser = await this.prismaService.user.findFirst({
      where: { email }
    })

    if (!isExistingUser) {
      throw new BadRequestException("Such user doesn't exist")
    }

    const isValidPassword = await compare(password, isExistingUser.password)

    if (!isValidPassword) {
      throw new BadRequestException('You have entered wrong password')
    }

    return this.tokenService.generateTokens({
      id: isExistingUser.id,
      role: isExistingUser.roleName
    })
  }

  async generateInvite({ role, email }: InviteDto) {
    const isExistingRole = await this.prismaService.role.findFirst({
      where: { name: role.toUpperCase() }
    })

    if (!isExistingRole)
      throw new BadRequestException('Such role does not exist')

    const token = this.tokenService.generateRandomToken(30)
    const ttl = 60 * 60 * 24 * 2

    await this.cacheStorage.set(token, { role, email }, ttl)

    await this.sendMail({
      title: 'Invite for authorization',
      to: email,
      subject: 'Invite for authorization',
      text: `You have been invited to the Mavy server as ${role}`,
      html: `<div>
        <p><b>You have been invited to the Mavy server as ${role}</b></p>
        <p>Use this token for invitation <input value="${token}" disabled="disabled" maxlength="${token.length + 6
        }" size="${token.length + 6}" /></p>
        </div>`
    })
  }

  async sendMail({ title, to, subject, text, html }: SendMailDto) {
    return await this.mailService.sendMail({
      from: `Mavy server / ${title} <no-reply@gmail.com>`,
      to,
      subject,
      text,
      html
    })
  }

  async compressFile(file: IFile) {
    return this.gzipCompressorService.compress(file)
  }

  async decompressFile(key: string) {
    const file = await this.appwriteFileService.download(key)
    if (!file) throw new NotFoundException('File not found')

    Object.assign(file, await this.gzipCompressorService.decompress(file))

    return { after: file.size, ...file }
  }

  async uploadFile(file: IFile) {
    const compressedFile = await this.gzipCompressorService.compress(file)
    return await this.appwriteFileService.upload(compressedFile)
  }
}
