import { PrismaClient } from '@prisma/client'

import * as bcrypt from 'bcrypt'

class Seed {
  private readonly prisma = new PrismaClient()

  constructor() {
    this.cleanSeedings()
  }

  async performSeedings() {
    try {
      await this.seedRoles()
      await this.seedUser()
    } catch (error) {
      process.exit(1)
    } finally {
      this.disconnect()
    }
  }

  async cleanSeedings() {
    await this.cleanUserSeed()

    return this
  }

  private async disconnect() {
    await this.prisma.$disconnect()
  }

  private async seedRoles() {
    const basedRoles = await this.generateBasedRoles()

    const existingRoles = (
      await this.prisma.role.findMany({
        where: { name: { in: basedRoles } }
      })
    ).map((role) => role.name)

    for await (const name of basedRoles) {
      if (!existingRoles.includes(name)) {
        await this.prisma.role.create({ data: { name } })
      }
    }
  }

  private async seedUser() {
    const data = await this.generateUserData()

    await this.prisma.user.create({
      data
    })
  }

  private async cleanUserSeed() {
    const { email, name, roleName } = await this.generateUserData()

    const existingUser = await this.prisma.user.findFirst({
      where: { email, name, roleName }
    })

    if (existingUser) {
      await this.prisma.user.deleteMany({ where: { email } })
    }
  }

  private async generateUserData() {
    const password = await bcrypt.hash('superadmin123!', 8)
    return {
      roleName: 'SUPERADMIN',
      name: 'Super admin',
      email: 'superadmin@gmail.com',
      password
    }
  }

  private async generateBasedRoles() {
    return ['GUEST', 'ADMIN', 'SUPERADMIN']
  }
}

new Seed().cleanSeedings().then((s) => s.performSeedings())
