import { Logger } from '@nestjs/common'

class MemoryStorage {
  private _storage = new Map<string | number, unknown>()

  private logger = new Logger()

  constructor() {
    this.logger.log('Memory storage has been connected')
  }

  get<T>(key: string) {
    return this._storage.get(key) as T | undefined
  }

  set<T>(key: string, value: T) {
    this._storage.set(key, value)
  }

  del(key: string): boolean {
    const isExistingEntity = this._storage.has(key)

    if (!isExistingEntity) return false

    this._storage.delete(key)

    return true
  }

  get storage() {
    return this._storage
  }
}

export const memoryStorage = new MemoryStorage()
