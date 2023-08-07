import * as AWS from 'aws-sdk'

import { SETTER_BUCKET_WRONG_VALUE } from '../file.constants'
import { FileStorage, IFile, TS3StorageOptions } from '../file.interface'

export class S3Storage implements FileStorage {
  private storage: AWS.S3
  constructor(options: TS3StorageOptions) {
    this.storage = new AWS.S3(options)
  }

  async delete(key: string) {
    await this.storage.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    return { success: true }
  }
  async save(file: IFile) {
    const response = await this.storage
      .upload({
        Bucket: this.bucket,
        Key: file.originalname,
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
  private $bucket: string
}
