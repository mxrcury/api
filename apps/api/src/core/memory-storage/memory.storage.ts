import { Storage } from "./memory-storage.interface";

export class MemoryStorage implements Storage {
  private _storage = new Map<string | number, unknown>()

  constructor() {
    console.info('Memory storage has been connected')
  }

  get<T>(key: string): T {
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

  update<T>(key: string, value: T): boolean {
    const isExistingBucket = this._storage.has(key)

    if (!isExistingBucket) return false

    this._storage.delete(key)
    this._storage.set(key, value)
  }

  get storage() {
    return this._storage
  }
}