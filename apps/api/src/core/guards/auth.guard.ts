import { cookieOptions } from '@configs'
import { PrismaService } from '@libs/prisma'
import { TokenService } from '@modules/token'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const token = request.cookies['accessToken']

    if (!token) {
      throw new UnauthorizedException(`You have not provide token in cookie`)
    }

    const isValidToken = this.tokenService.validateAccessToken(token)

    if (isValidToken && typeof isValidToken !== 'string') {
      const user = await this.prismaService.user.findFirst({
        where: { id: isValidToken.id }
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const { id, email } = user

      // change logic after adding ALS
      request.user = { id, email }

      return true
    }

    const tokens = await this.prismaService.tokens.findFirst({
      where: { accessToken: token }
    })

    if (tokens) {
      const isValidRefreshToken = this.tokenService.validateRefreshToken(
        tokens.refreshToken
      )

      if (!isValidRefreshToken) {
        await this.prismaService.tokens.delete({ where: { id: tokens.id } })

        throw new UnauthorizedException()
      }

      const user = await this.prismaService.user.findFirst({
        where: { id: tokens.userId }
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const { id, email } = user

      const accessToken = await this.tokenService.generateAccessToken({
        id,
        email
      })

      const response = context.switchToHttp().getResponse()

      response.cookie('token', accessToken, cookieOptions)

      // change logic after adding ALS
      request.user = { id, email }

      return true
    }

    return false
  }
}
