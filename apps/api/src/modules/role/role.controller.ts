import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Auth, Roles } from '@core/decorators'
import { RoleGuard } from '@core/guards/role.guard'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './role.enum'
import { RoleService } from './role.service'

@UseGuards(RoleGuard)
@Auth()
@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  getAll() {
    return this.roleService.getAll()
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a role' })
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':name')
  @ApiOperation({ summary: 'Delete a role' })
  delete(@Param('name') name: string) {
    return this.roleService.delete(name)
  }
}
