import * as jwt from 'jsonwebtoken'

import { BadRequestException, Injectable } from '@nestjs/common'

import { env } from '@configs'
import { PrismaService } from '@libs/prisma'
import { IBasicTokenPayload } from '@modules/token'
import { randomBytes } from 'crypto'

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}
  // TODO: move tokens saving to redis when it will be connected!!!

  async generateTokens<P extends IBasicTokenPayload>(payload: P) {
    try {
      const accessToken = await this.generateAccessToken<P>(payload)
      const refreshToken = await this.generateRefreshToken<P>(payload)

      await this.prismaService.tokens.create({
        data: { accessToken, refreshToken, userId: payload.id }
      })

      return {
        accessToken
      }
    } catch (error) {
      throw new BadRequestException('Generating tokens was failed')
    }
  }

  async generateAccessToken<P extends IBasicTokenPayload>(payload: P) {
    const token = jwt.sign(payload, env.ACCESS_SECRET_KEY, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
    })

    const isTokenExisting = await this.prismaService.tokens.findFirst({
      where: { userId: payload.id }
    })

    if (isTokenExisting) {
      await this.prismaService.tokens.updateMany({
        where: { userId: payload.id },
        data: { accessToken: token }
      })
    }

    return token
  }

  async generateRefreshToken<P extends IBasicTokenPayload>(payload: P) {
    const token = jwt.sign(payload, env.REFRESH_SECRET_KEY, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
    })

    const isTokenExisting = await this.prismaService.tokens.findFirst({
      where: { userId: payload.id }
    })

    if (isTokenExisting) {
      await this.prismaService.tokens.updateMany({
        where: { userId: payload.id },
        data: { refreshToken: token }
      })
    }

    return token
  }

  generateRandomToken() {
    return randomBytes(50)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\//g, '')
  }

  validateAccessToken(token: string) {
    return this.tokenValidationFactory(token, env.ACCESS_SECRET_KEY)
  }

  validateRefreshToken(token: string) {
    return this.tokenValidationFactory(token, env.REFRESH_SECRET_KEY)
  }

  private tokenValidationFactory(token: string, secretKey: string) {
    try {
      return jwt.verify(token, secretKey)
    } catch (error) {
      return null
    }
  }
}
