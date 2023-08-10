import { env } from '@configs/env.config'
import { azureConfig, firebaseConfig, localStorageConfig, s3Config } from '@configs/storages.config'
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
        naming: { random: true },
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
        storage: new AppWriteStorage({ projectId: '64d3a547db631932fa0e', endpoint: 'https://cloud.appwrite.io/v1', apiKey: 'a6c7954ed5420f53cdf082b29736dc1305a672389c1aff313668b87cd66659cb695c6649048f119a12cf65dd5f0a93345802f62c825036193294a751c13519bdf0490887cac65ac8b1ebab48234540ddc6a99bf47341a05d4fff7214f2e6f37280bbfd2517137fb372904a4a334c61ac46867e6ebade93a666b403628b7147e8' }),
        bucket: '64d3a57d59f954851801'
      })
    }
  ]
})
export class AuthModule { }
