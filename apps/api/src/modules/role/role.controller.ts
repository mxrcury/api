import { User } from '@core/decorators/user.decorator'
import { Controller, Get } from '@nestjs/common'
import { RoleService } from './role.service'

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async get(@User() user: { id: string; email: string }) {
    return user
  }
}
