import { Injectable } from '@nestjs/common'
import { BANNED_FOR_FILE_LIMIT } from './file.contants'
import {
  FileStorage,
  IFileServiceOptions,
  IResponse,
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
    await this.storage.delete(key)

    return {
      status: 204
    }
  }
  async save(file: Express.Multer.File): Promise<IResponse> {
    const fileLimit = this.storage.options.fileLimit.limit
    const perSeconds = this.options.fileLimit.perSeconds
    const uploadedFiles = 22

    if (fileLimit > uploadedFiles) {
      // ban user, change ofc
      const ban = (user: string, secs: number) => {
        console.log('Ban ->', user, 'Per ->', secs)
      }

      ban('jordan', perSeconds)

      throw new Error(BANNED_FOR_FILE_LIMIT)
    }

    const { url } = await this.storage.save(file)

    return {
      url,
      status: 201
    }
  }

  public set options(value: IStorageOptions) {
    this.storage.options = value
  }

  public set bucket(value: string) {
    if (typeof value === 'string' && value.trim().length) {
      this.storage.bucket = value
    }
  }

  public get bucket() {
    return this.storage.bucket
  }
}
