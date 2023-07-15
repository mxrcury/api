import { cacheOptions } from '@configs/cache.config'
import {
  CacheInterceptor,
  CacheModule as CacheManagerModule
} from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { CacheService } from './cache.service'

@Global()
@Module({
  imports: [CacheManagerModule.register(cacheOptions)],
  providers: [
    CacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  exports: [CacheService]
})
export class CacheModule {}
