import { env } from '@configs/env.config'
import { supabaseConfig } from '@configs/storages.config'
import { GzipCompressorService } from '@core/file-compressor/compressors'
import {
  FileService,
  SUPABASE_STORAGE,
  SupabaseStorage
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
      provide: SUPABASE_STORAGE,
      useFactory: () => new FileService({
        storage: new SupabaseStorage(supabaseConfig),
        bucket: env.SUPABASE_BUCKET_NAME,
        include: { url: true, key: true },
        limits: {
          extensions: {
            include: ['.png']
          }
        },
        naming: { random: true }
      })
    },
    GzipCompressorService
  ]
})
export class AuthModule { }
