import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    )
    const user = request.user

    if (!user)
      throw new UnauthorizedException(
        'You are not authorized to perform this action'
      )

    if (!user.role) throw new UnauthorizedException("You don't have role")

    if (allowedRoles.includes('ALL')) return true

    if (allowedRoles.includes(user.role)) return true
  }
}
