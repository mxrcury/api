import { Module } from '@nestjs/common'

import { AuthModule } from '@modules/auth'
import { RoleModule } from '@modules/role'
import { TokenModule } from '@modules/token'

import { AsyncStorageModule } from '@core/async-storage'
import { CacheModule } from '@core/cache'
import { ExceptionModule } from '@core/exceptions'
import { MailModule } from '@core/mail'
import { SwaggerModule } from '@core/swagger'

import { PrismaModule } from '@libs/prisma'
import { ScheduleModule } from '@nestjs/schedule'
import { CronModule } from './cron'
import { CompressorModule } from './file-compressor/compressor.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TokenModule,
    ExceptionModule,
    SwaggerModule,
    RoleModule,
    CacheModule,
    AsyncStorageModule,
    ScheduleModule.forRoot(),
    CronModule,
    MailModule,
    CompressorModule.forRoot()
  ]
})
export class AppModule { }
