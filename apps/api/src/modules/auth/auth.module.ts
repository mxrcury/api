import { env } from '@configs/env.config'
import { appWriteConfig, azureConfig, firebaseConfig, localStorageConfig, s3Config, supabaseConfig } from '@configs/storages.config'
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
  S3_STORAGE,
  SUPABASE_STORAGE,
  SupabaseStorage,
} from "@libs/file-storage"
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
          storage: new S3Storage(s3Config),
          naming: { date: false },
          bucket: env.AWS_BUCKET_NAME
        })
    },
    {
      provide: LOCAL_STORAGE,
      useFactory: () => new FileService({
        storage: new LocalStorage(localStorageConfig),
        bucket: 'local-files'
      })
    },
    {
      provide: FIREBASE_STORAGE,
      useFactory: () => new FileService({
        bucket: env.FIREBASE_BUCKET_NAME,
        storage: new FirebaseStorage(firebaseConfig),
        naming: { default: true },
      })
    },
    {
      provide: AZURE_STORAGE,
      useFactory: () => new FileService({
        bucket: env.AZURE_BUCKET_NAME, storage: new AzureStorage(azureConfig)
      })
    },
    {
      provide: APPWRITE_STORAGE,
      useFactory: () => new FileService({
        storage: new AppWriteStorage(appWriteConfig),
        bucket: env.APPWRITE_BUCKET_NAME
      })
    },
    {
      provide: SUPABASE_STORAGE,
      useFactory: () => new FileService({
        storage: new SupabaseStorage(supabaseConfig),
        bucket: env.SUPABASE_BUCKET_NAME
      })
    }
  ]
})
export class AuthModule { }
