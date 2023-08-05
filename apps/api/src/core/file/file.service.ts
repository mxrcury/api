import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { extname } from 'path'
import { FileStorage, IFileServiceOptions, IResponse } from './file.interface'

@Injectable()
export class FileService {
  private storage: FileStorage

  constructor({ storage, bucket, ...options }: IFileServiceOptions) {
    this.storage = storage
    this.storage.bucket = bucket
    this.storage.options = options
  }
  async delete(key: string): Promise<IResponse> {
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
  async save(file: Express.Multer.File): Promise<IResponse> {
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
    const { file } = this.storage.options
    const ext = extname(fileName)

    if (file.generateRandomName) {
      return randomBytes(9).toString('hex') + ext
    }

    const originalName = file.includeBaseName
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
