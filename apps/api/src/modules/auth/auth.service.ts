import { compare, genSalt, hash } from 'bcrypt'

import { PrismaService } from '@libs/prisma'
import { BadRequestException, Injectable } from '@nestjs/common'

import { MailService } from '@core/mail'
import { memoryStorage } from '@core/memory-storage/memory.storage'
import { TokenService } from '@modules/token/token.service'
import { SendMailDto } from './dto/send-mail.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  async signUp(dto: SignUpDto, token?: string) {
    const { email, name, password } = dto

    const isExistingUser = await this.prismaService.user.findFirst({
      where: { email }
    })

    if (isExistingUser) {
      throw new BadRequestException('User with such email already exists')
    }

    const hashSalt = await genSalt(10)
    const hashedPassword = await hash(password, hashSalt)

    const user = {
      email,
      name,
      password: hashedPassword,
      roleName: 'GUEST'
    }

    // for invitation for specific role, by default it will
    if (token) {
      const isExistingTokenInvite = memoryStorage.get<{ role: string }>(token)

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

    const areExistingTokens = await this.prismaService.tokens.findFirst({
      where: { userId: isExistingUser.id }
    })

    if (areExistingTokens) {
      return {
        accessToken: areExistingTokens.accessToken,
        refreshToken: areExistingTokens.refreshToken
      }
    }

    return this.tokenService.generateTokens({
      id: isExistingUser.id,
      role: isExistingUser.roleName
    })
  }

  async sendMail({ title, to, subject, text, html }: SendMailDto) {
    return await this.mailService.sendMail({
      from: `Mavy server / ${title} <mavy@gmail.com>`,
      to,
      subject,
      text,
      html
    })
  }
}
