import { Auth } from '@core/decorators'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'

@Auth()
@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  getAll() {
    return this.roleService.getAll()
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.roleService.delete(name)
  }
}
