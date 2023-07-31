import { Inject, Injectable } from '@nestjs/common'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key)
  }

  async set<T>(key: string, value: T, ttl?: number) {
    await this.cacheManager.set(key, value, ttl)
  }

  async del(key: string) {
    await this.cacheManager.del(key)
  }
}
