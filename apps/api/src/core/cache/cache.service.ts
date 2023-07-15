import { Inject, Injectable } from '@nestjs/common'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return this.cacheManager.get(key)
  }

  async set<T>(key: string, value: T) {
    await this.cacheManager.set(key, value)
  }

  async del(key: string) {
    await this.cacheManager.del(key)
  }
}
