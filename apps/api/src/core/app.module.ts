import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from '@modules/auth'
import { RoleModule } from '@modules/role'
import { TokenModule } from '@modules/token'

import { AsyncStorageModule } from '@core/async-storage'
import { CacheModule } from '@core/cache'
import { CronModule } from '@core/cron'
import { ExceptionModule } from '@core/exceptions'
import { FileCompressorModule } from '@core/file-compressor'
import { MailModule } from '@core/mail'
import { SwaggerModule } from '@core/swagger'

import { compressorConfig } from '@configs/compressor.config'
import { PrismaModule } from '@libs/prisma'

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
    FileCompressorModule.forRoot(compressorConfig)
  ]
})
export class AppModule { }
