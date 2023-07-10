import { Module } from '@nestjs/common'

import { AuthModule } from '@modules/auth'
import { TokenModule } from '@modules/token'

import { ExceptionModule } from '@core/exceptions'
import { SwaggerModule } from '@core/swagger'
import { PrismaModule } from '@libs/prisma'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TokenModule,
    ExceptionModule,
    SwaggerModule
  ]
})
export class AppModule {}
