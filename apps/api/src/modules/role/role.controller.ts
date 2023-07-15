import { Auth, Roles } from '@core/decorators'
import { RoleGuard } from '@core/guards/role.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './role.enum'
import { RoleService } from './role.service'

@UseGuards(RoleGuard)
@Auth()
@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAll() {
    return this.roleService.getAll()
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Roles(Role.ADMIN)
  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.roleService.delete(name)
  }
}
