import { compare, genSalt, hash } from 'bcrypt'

import { PrismaService } from '@libs/prisma'
import { BadRequestException, Injectable } from '@nestjs/common'

import { TokenService } from '@modules/token/token.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(dto: SignUpDto) {
    const { email, name, password } = dto

    const isExistingUser = await this.prismaService.user.findFirst({
      where: { email }
    })

    if (isExistingUser) {
      throw new BadRequestException('User with such email already exists')
    }

    const hashSalt = await genSalt(10)
    const hashedPassword = await hash(password, hashSalt)

    await this.prismaService.user.create({
      data: { email, name, password: hashedPassword }
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

    return this.tokenService.generateTokens({ id: isExistingUser.id })
  }
}
