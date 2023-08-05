import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common'
import { S3_STORAGE } from './file.constants'
import { TS3StorageOptions } from './file.interface'
import { FileService } from './file.service'
import { S3Storage } from './storages/s3.storage'

interface IS3ModuleOptions extends DynamicModule {
  buckets: string[]
  options: TS3StorageOptions
}

@Module({})
export class S3Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    throw new Error('Method not implemented.')
  }
  static forRoot(options: IS3ModuleOptions): DynamicModule {
    const { buckets, options: s3Options, global } = options
    return {
      providers: buckets.map((bucket, i) => ({
        provide: `${S3_STORAGE}_${i}`,
        useFactory: () =>
          new FileService({
            storage: new S3Storage({ ...s3Options }),
            bucket
          })
      })),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      module: new S3Module()
    }
  }
}

@Module({
  imports: [
    S3Module.forRoot({ buckets: ['mavy_photos', 'mavy_videos'], global: true }) // add dynamically creating properties of entered buckets and make requests by every bucket separetely
  ]
})
export class TestModule {}
