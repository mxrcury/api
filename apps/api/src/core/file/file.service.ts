import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { extname } from 'path'
import {
  FileStorage,
  IFileServiceOptions,
  IStorageOptions
} from './file.interface'

@Injectable()
export class FileService implements FileStorage {
  private storage: FileStorage

  constructor({ storage, bucket, ...options }: IFileServiceOptions) {
    this.storage = storage
    this.storage.bucket = bucket
    this.storage.options = options
  }
  async delete(key: string) {
    try {
      return await this.storage.delete(key)
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          errorMessage: error.message
        }
      }
    }
  }
  async save(file: Express.Multer.File) {
    try {
      const { url } = await this.storage.save({
        ...file,
        originalname: this.generateFileName(file.originalname)
      })

      return {
        url,
        success: true
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          errorMessage: error.message
        }
      }
    }
  }

  private generateFileName(fileName: string) {
    const { file } = this.options
    const ext = extname(fileName)

    if (file.generateRandomName) {
      return randomBytes(9).toString('hex') + ext
    }

    const originalName = this.options.file.includeBaseName
      ? fileName.slice(0, fileName.lastIndexOf('.'))
      : ''

    const uniqueIdentifier = file.includeDate
      ? Date.now()
      : randomBytes(9).toString('hex')

    const baseName = originalName.length
      ? originalName + '_' + uniqueIdentifier
      : uniqueIdentifier

    return `${file.prefix}${baseName}${file.postfix}${ext}`
  }

  public set options(value: IStorageOptions) {
    this.storage.options = value
  }

  public get bucket() {
    return this.storage.bucket
  }
}
