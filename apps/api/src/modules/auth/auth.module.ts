import { Module } from '@nestjs/common'

import { TokenModule, TokenService } from '@modules/token'

import { env } from '@configs/env.config'
import { appWriteConfig, azureConfig, firebaseConfig, localStorageConfig, s3Config } from '@configs/storages.config'
import {
  APPWRITE_STORAGE,
  AZURE_STORAGE,
  AppWriteStorage,
  AzureStorage,
  FIREBASE_STORAGE,
  FileService,
  FirebaseStorage,
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
        storage: new LocalStorage(localStorageConfig),
        bucket: 'images',
        include: { url: true, key: true },
        naming: { random: true },
        limits: { extensions: '*' }
      })
    },
    {
      provide: FIREBASE_STORAGE,
      useFactory: () => new FileService({
        storage: new FirebaseStorage(firebaseConfig),
        bucket: env.FIREBASE_BUCKET_NAME,
        include: { url: true, key: true }
      })
    },
    {
      provide: AZURE_STORAGE,
      useFactory: () => new FileService({
        storage: new AzureStorage(azureConfig),
        bucket: env.AZURE_BUCKET_NAME,
        include: { url: true, key: true }
      })
    },
    {
      provide: APPWRITE_STORAGE,
      useFactory: () => new FileService({
        storage: new AppWriteStorage(appWriteConfig),
        bucket: env.APPWRITE_BUCKET_NAME,
        include: { url: true, key: true }
      })
    }
  ]
})
export class AuthModule { }
