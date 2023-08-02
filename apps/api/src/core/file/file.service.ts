import { Injectable } from '@nestjs/common'
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
      const { url } = await this.storage.save(file)

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

  public set options(value: IStorageOptions) {
    this.storage.options = value
  }

  public get bucket() {
    return this.storage.bucket
  }
}

// const fileLimit = this.storage.options.fileLimit.limit
// const perSeconds = this.options.fileLimit.perSeconds
// const uploadedFiles = 22

// if (fileLimit > uploadedFiles) {
//   // ban user, change ofc
//   const ban = (user: string, secs: number) => {
//     console.log('Ban ->', user, 'Per ->', secs)
//   }

//   ban('jordan', perSeconds)

//   return {
//     success: false
//   }
// }
