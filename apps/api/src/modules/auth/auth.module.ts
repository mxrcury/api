import { env } from '@configs/env.config'
import { firebaseConfig } from '@configs/firebase.config'
import {
  FIREBASE_STORAGE,
  FileService,
  FirebaseStorage,
  LOCAL_STORAGE,
  LocalStorage,
  S3Storage,
  S3_STORAGE
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
          storage: new S3Storage({
            credentials: {
              accessKeyId: env.AWS_ACCESS_KEY_ID,
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY
            }
          }),
          bucket: env.AWS_BUCKET_NAME
        })
    },
    {
      provide: LOCAL_STORAGE,
      useFactory: () => new FileService({
        storage: new LocalStorage({ localFolder: 'public' }),
        bucket: 'local-files'
      })
    },
    {
      provide: FIREBASE_STORAGE,
      useFactory: () => new FileService({
        storage: new FirebaseStorage(firebaseConfig),
        bucket: env.FIREBASE_BUCKET_NAME
      })
    }
  ]
})
export class AuthModule { }
