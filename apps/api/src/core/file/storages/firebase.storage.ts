import { extname } from 'path'
import { SETTER_BUCKET_WRONG_VALUE } from '../file.contants'
import {
  FileStorage,
  IFirebaseStorageOptions,
  IStorageOptions
} from '../file.interface'

export class FirebaseStorage implements FileStorage {
  constructor(options: IFirebaseStorageOptions) {
    console.log(options)
  }
  async delete(key: string) {
    console.log(key)

    return {
      success: true
    }
  }
  async save(file: Express.Multer.File) {
    const baseFileName = file.originalname.slice(
      0,
      file.originalname.lastIndexOf('.')
    )
    const ext = extname(file.originalname)
    const fileName = `${baseFileName}_${Date.now()}${ext})}`

    return {
      url: fileName,
      success: true
    }
  }

  set options(value: IStorageOptions) {
    this.$options = value
  }

  set bucket(value: string) {
    if (typeof value === 'string' && value.trim().length) {
      this.$bucket = value
      return
    }
    throw new Error(SETTER_BUCKET_WRONG_VALUE)
  }

  get bucket() {
    return this.$bucket
  }

  private $options: IStorageOptions
  private $bucket: string
}
