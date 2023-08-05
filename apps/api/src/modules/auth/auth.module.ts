import { env } from '@configs/env.config'
import { FileService } from '@core/file'
import { S3_STORAGE } from '@core/file/file.constants'
import { S3Storage } from '@core/file/storages/s3.storage'
import { TokenModule, TokenService } from '@modules/token'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: S3_STORAGE,
      useFactory: () =>
        new FileService({
          storage: new S3Storage({
            credentials: {
              accessKeyId: env.AWS_ACCESS_KEY_ID,
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY
            }
          }),
          bucket: 'photos',
          file: {
            postfix: '/watahell',
            prefix: 'brah/',
            includeBaseName: true,
            includeDate: false
          }
        })
    }
  ]
})
export class AuthModule {}
