import * as AWS from 'aws-sdk'
import { extname } from 'path'
import { SETTER_BUCKET_WRONG_VALUE } from '../file.contants'
import {
  FileStorage,
  IStorageOptions,
  TS3StorageOptions
} from '../file.interface'

export class S3Storage implements FileStorage {
  private storage: AWS.S3
  constructor(options: TS3StorageOptions) {
    this.storage = new AWS.S3(options)
  }
  async delete(key: string) {
    await this.storage.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    return { success: true }
  }
  async save(file: Express.Multer.File) {
    const baseFileName = file.originalname.slice(
      0,
      file.originalname.lastIndexOf('.')
    )
    const ext = extname(file.originalname)
    const fileName = `${baseFileName}_${Date.now()}${ext})}`

    const response = await this.storage
      .upload({
        Bucket: this.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
      })
      .promise()

    const url = await this.storage.getSignedUrlPromise('getObject', {
      Bucket: this.bucket,
      Key: response.Key
    })

    return { url, success: true }
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
