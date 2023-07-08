import { Module } from '@nestjs/common'

import { AuthModule } from '@modules/auth'
import { TokenModule } from '@modules/token'

import { ExceptionModule } from '@core/exceptions'
import { PrismaModule } from '@libs/prisma'

@Module({
  imports: [PrismaModule, AuthModule, TokenModule, ExceptionModule]
})
export class AppModule {}
