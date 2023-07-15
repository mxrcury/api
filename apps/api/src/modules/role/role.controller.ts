import { Auth } from '@core/decorators'
import { User } from '@core/decorators/user.decorator'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'

@Auth()
@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async get(@User() user: { id: string; email: string }) {
    return user
  }
}
