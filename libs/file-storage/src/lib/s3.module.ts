// import {
//     DynamicModule,
//     Module
// } from '@nestjs/common'
// import { S3_STORAGE } from './file.constants'
// import { TS3StorageOptions } from './file.interface'

// interface IS3ModuleOptions extends DynamicModule {
//     buckets: string[]
//     options: TS3StorageOptions
// }

// @Module({})
// export class S3Module {
//     static forRoot(options: IS3ModuleOptions): DynamicModule {
//         const { buckets, options: s3Options, global } = options
//         return {
//             providers: buckets.map((bucket, i) => ({
//                 provide: S3_STORAGE,
//                 useValue: buckets.reduce(bucket => bucket)
//             })),
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-ignore
//             module: S3Module
//         }
//     }
// }

// // @Module({
// //   imports: [
// //     S3Module.forRoot({
// //       buckets: ['mavy_photos', 'mavy_videos'],
// //       global: true,
// //       options: {
// //         credentials: {
// //           accessKeyId: env.AWS_ACCESS_KEY_ID,
// //           secretAccessKey: env.AWS_SECRET_ACCESS_KEY
// //         }
// //       }
// //     }) // add dynamically creating properties of entered buckets and make requests by every bucket separetely
// //   ]
// // })
// // export class TestModule {}
