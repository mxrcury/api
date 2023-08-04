import { cookieOptions } from '@configs'
import { AsyncStorageService } from '@core/async-storage/async-storage.service'
import { CacheService } from '@core/cache'
import { IUserTokenPayload } from '@core/interfaces/auth.interface'
import { PrismaService } from '@libs/prisma'
import { TokenService } from '@modules/token'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cacheService: CacheService,
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
    private readonly asyncStorage: AsyncStorageService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getClass(),
      context.getHandler()
    ])

    if (isPublic) return true

    const token = request.cookies['token']

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

      const { id, roleName: role } = user

      this.asyncStorage.set('user', { id, role })

      return true
    }

    const tokens = await this.cacheService.get<IUserTokenPayload>(token)

    if (tokens) {
      const isValidRefreshToken = this.tokenService.validateRefreshToken(
        tokens.refreshToken
      )

      if (!isValidRefreshToken) {
        await this.cacheService.del(token)

        throw new UnauthorizedException()
      }

      const user = await this.prismaService.user.findFirst({
        where: { id: tokens.userId }
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const { id, roleName: role } = user

      const accessToken = await this.tokenService.generateAccessToken({
        id,
        role
      })

      await this.cacheService.set(accessToken, { userId: id, refreshToken: tokens.refreshToken })

      const response = context.switchToHttp().getResponse()

      response.cookie('token', accessToken, cookieOptions)

      this.asyncStorage.set('user', { id, role })

      return true
    }

    return false
  }
}
