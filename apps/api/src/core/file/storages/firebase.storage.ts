import { extname } from 'path'
import { SETTER_WRONG_VALUE } from '../file.contants'
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

    return
  }
  async save(file: Express.Multer.File) {
    const baseFileName = file.originalname.slice(
      0,
      file.originalname.lastIndexOf('.')
    )
    const ext = extname(file.originalname)
    const fileName = `${baseFileName}_${Date.now()}${ext})}`

    return {
      url: fileName
    }
  }

  public set options(value: IStorageOptions) {
    this.options = value
  }

  public set bucket(value: string) {
    if (typeof value === 'string' && value.trim().length) {
      this.$bucket = value
    }
    throw new Error(SETTER_WRONG_VALUE)
  }

  public get bucket() {
    return this.$bucket
  }

  private $bucket: string
}
