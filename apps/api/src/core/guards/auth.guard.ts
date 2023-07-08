import { PrismaService } from '@libs/prisma'
import { TokenService } from '@modules/token'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
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

    if (isValidToken) {
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
        return false
      }

      const user = await this.prismaService.user.findFirst({
        where: { id: tokens.userId }
      })
      const accessToken = await this.tokenService.generateAccessToken({
        id: user.id,
        email: user.email
      })

      const response = context.switchToHttp().getResponse()

      response.cookie('accessToken', accessToken)

      return true
    }

    return false
  }
}
