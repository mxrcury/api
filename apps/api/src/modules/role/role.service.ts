import { PrismaService } from '@libs/prisma'
import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateRoleDto) {
    const { name } = dto

    await this.prismaService.role.create({ data: { name } })
  }

  async getAll() {
    return await this.prismaService.role.findMany({ select: { name: true } })
  }

  async delete(name: string) {
    await this.prismaService.role.delete({ where: { name } })
  }
}
