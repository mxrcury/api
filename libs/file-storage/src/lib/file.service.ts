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
          errorMessage: error.message
        }
      }
    }
  }
  async save(file: IFile): Promise<IResponse> {
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
    const { naming } = this.options
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
    const baseNamingOptions = { generateRandomName: false, includeBaseName: true, includeDate: true }
    this.$options = { ...value, naming: { ...baseNamingOptions, ...value.naming } }
  }

  get options() {
    return this.$options
  }

  private $options: IStorageOptions
}
