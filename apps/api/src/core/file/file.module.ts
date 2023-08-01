import { env } from '@configs/env.config'
import { Global, Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FirebaseStorage } from './storages/firebase.storage'
import { S3Storage } from './storages/s3.storage'

const S3_STORAGE = 'S3_STORAGE'
const FIREBASE_STORAGE = 'FIREBASE_STORAGE'

@Global()
@Module({
  providers: [
    {
      provide: S3_STORAGE,
      useFactory() {
        return new FileService({
          storage: new S3Storage({
            credentials: {
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
              accessKeyId: env.AWS_ACCESS_KEY_ID
            }
          }),
          bucket: 'mavybucket'
        })
      }
    },
    {
      provide: FIREBASE_STORAGE,
      useFactory() {
        return new FileService({
          storage: new FirebaseStorage({ fireStoreKey: 'dwqdq' }),
          bucket: 'mavyfirebase',
          fileLimit: { limit: 20, perSeconds: 3600 }
          // add something like storage for containing banned users, idk how to call it,"userStore", "store", "database"
          // "userDatabase"
          // and add in memory storage and redis
        })
      }
    }
  ],
  exports: [FileService]
})
export class FileModule {}
