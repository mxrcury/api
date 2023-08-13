import { Module } from '@nestjs/common'

import { TokenModule, TokenService } from '@modules/token'

import { env } from '@configs/env.config'
import { s3Config } from '@configs/storages.config'
import {
  FileService,
  LOCAL_STORAGE,
  LocalStorage,
  S3Storage,
  S3_STORAGE
} from "@libs/file-storage"

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
      useFactory: () => new FileService({
        storage: new S3Storage(s3Config),
        bucket: env.AWS_BUCKET_NAME,
        include: { url: true, key: true },
        limits: {
          extensions: '*'
        },
        naming: { random: true }
      })
    },
    {
      provide: LOCAL_STORAGE,
      useFactory: () => new FileService({
        storage: new LocalStorage({ localFolder: 'public' }),
        bucket: 'images',
        include: { url: true, key: true },
        naming: { random: true },
        limits: { extensions: '*' }
      })
    }
  ]
})
export class AuthModule { }
