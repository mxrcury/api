import fs from 'fs/promises'
import path, { extname } from 'path'

import { FileStorage } from '../../file.interface'
import { SETTER_BUCKET_WRONG_VALUE, allMimeTypes } from './local.constants'
import { IFile, ILocalStorageOptions } from './local.types'

export class LocalStorage implements FileStorage {
  constructor(options: ILocalStorageOptions) {
    this.localStorageOptions = options
    this.initializeLocalFolder()
  }

  async initializeLocalFolder() {
    const isExistingLocalFolder = await this.checkDirExistence(path.resolve(this.localStorageOptions.localFolder))
    if (!isExistingLocalFolder) await fs.mkdir(path.resolve(this.localStorageOptions.localFolder))

    const isExistingBucket = await this.checkDirExistence(path.resolve(this.localStorageOptions.localFolder, this.bucket))
    if (!isExistingBucket) await fs.mkdir(path.resolve(this.localStorageOptions.localFolder, this.bucket))
  }

  async upload(file: IFile) {
    const filePath = path.resolve(
      this.localStorageOptions.localFolder,
      this.bucket,
      file.originalname
    )

    await fs.writeFile(filePath, file.buffer)

    return { key: file.originalname, success: true }
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

  async getUrl(key: string) {
    const url = path.resolve(
      this.localStorageOptions.localFolder,
      this.bucket,
      key
    )

    return url
  }

  async download(key: string) {
    const buffer = await fs.readFile(path.resolve(this.localStorageOptions.localFolder, this.bucket, key))
    const fileInfo = await fs.lstat(path.resolve(this.localStorageOptions.localFolder, this.bucket, key))

    return {
      buffer,
      size: fileInfo.size,
      mimetype: allMimeTypes[extname(key)],
      originalname: key,
    }
  }

  private async checkDirExistence(path: string) {
    try {
      await fs.access(path)
      return true
    } catch (error) {
      return false
    }
  }

  get localStorageOptions() {
    return this.$localStorageOptions
  }

  set localStorageOptions(value: ILocalStorageOptions) {
    this.$localStorageOptions = value
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

  private $bucket: string

  private $localStorageOptions: ILocalStorageOptions
}
