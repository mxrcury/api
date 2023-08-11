import { randomBytes } from 'crypto'
import { extname } from 'path'
import { FileStorage, IFile, IFileServiceOptions, IResponse, IStorageOptions } from './file.interface'

export class FileService {
  private storage: FileStorage

  constructor({ storage, bucket, ...options }: IFileServiceOptions) {
    this.options = options
    this.storage = storage
    this.storage.bucket = bucket
  }

  async delete(key: string): Promise<IResponse> {
    try {
      return await this.storage.delete(key)
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: {
            message: error.message
          }
        }
      }
    }
  }
  async upload(file: IFile): Promise<IResponse> {
    try {
      this.checkExtension(file.originalname)

      const { key, url } = await this.storage.upload({
        ...file,
        originalname: this.generateFileName(file.originalname)
      })

      return {
        success: true,
        ...(this.options.include.url && { url: url || await this.getFileUrl(key) }),
        ...(this.options.include.key && { key })
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: {
            message: error.message
          }
        }
      }
    }
  }

  private checkExtension(fileName: string) {
    if (this.options.limits?.extensions !== '*') {
      const { exclude, include } = this.options.limits.extensions
      const ext = extname(fileName)

      if (exclude?.length && exclude.includes(ext)) throw new Error('File extension is not allowed')
      if (include?.length && !include.includes(ext)) throw new Error('File extension is not allowed')
    }
  }

  private async getFileUrl(key: string) {
    return await this.storage.getUrl(key)
  }

  private generateFileName(fileName: string) {
    const { naming } = this.options

    if (naming.default && !naming.random) return fileName

    const ext = extname(fileName)

    if (naming.random) {
      return randomBytes(9).toString('hex') + ext
    }

    const originalName = naming.baseName
      ? fileName.slice(0, fileName.lastIndexOf('.'))
      : ''

    const uniqueIdentifier = naming.date
      ? Date.now()
      : randomBytes(9).toString('hex')

    const baseName = originalName.length
      ? originalName + '_' + uniqueIdentifier
      : uniqueIdentifier

    return `${naming.prefix || ''}${baseName}${naming.postfix || ''}${ext}`
  }

  set options(value: IStorageOptions) {
    const baseNamingOptions = { random: false, baseName: false, date: false, default: true }
    this.$options = { ...value, naming: { ...baseNamingOptions, ...value.naming } }
  }

  get options() {
    return this.$options
  }

  private $options: IStorageOptions
}
