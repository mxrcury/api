import fs from 'fs/promises'
import path from 'path'

import { SETTER_BUCKET_WRONG_VALUE } from '../file.constants'
import {
  FileStorage,
  ILocalStorageOptions,
  IStorageOptions
} from '../file.interface'

export class LocalStorage implements FileStorage {
  constructor(options: ILocalStorageOptions) {
    this.localStorageOptions = options
  }

  async save(file: Express.Multer.File) {
    const filePath = path.resolve(
      this.localStorageOptions.localFolder,
      this.bucket,
      file.originalname
    )

    await fs.writeFile(filePath, file.buffer)

    return { url: filePath, success: true }
  }
  async delete(key: string) {
    const filePath = path.resolve(
      this.localStorageOptions.localFolder,
      this.bucket,
      key
    )

    await fs.rm(filePath)

    return { success: true }
  }

  get localStorageOptions() {
    return this.$localStorageOptions
  }

  set localStorageOptions(value: ILocalStorageOptions) {
    this.$localStorageOptions = value
  }

  set options(value: IStorageOptions) {
    this.$options = value
  }

  get bucket() {
    return this.$bucket
  }

  set bucket(value: string) {
    if (typeof value === 'string' && value.trim().length) {
      this.$bucket = value
      return
    }
    throw new Error(SETTER_BUCKET_WRONG_VALUE)
  }

  private $options: IStorageOptions
  private $bucket: string

  private $localStorageOptions: ILocalStorageOptions
}
