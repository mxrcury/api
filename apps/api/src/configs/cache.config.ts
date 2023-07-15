import { CacheModuleOptions } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-ioredis-yet'
import { env } from './env.config'

export const cacheOptions: CacheModuleOptions = {
  isGlobal: true,
  store: () => {
    return redisStore({
      port: env.REDIS_PORT,
      host: env.REDIS_HOST
    })
  }
}
