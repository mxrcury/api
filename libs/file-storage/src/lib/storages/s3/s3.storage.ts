import * as AWS from 'aws-sdk'

import { FileStorage, TDownloadedFile } from '../../file.interface'
import {
  IFile,
  TS3StorageOptions
} from '../s3/s3.types'
import { SETTER_BUCKET_WRONG_VALUE } from './s3.constants'

export class S3Storage implements FileStorage {
  private storage: AWS.S3

  constructor(options: TS3StorageOptions) {
    this.storage = new AWS.S3(options)
  }
  async download(key: string): Promise<TDownloadedFile> {
    const file = await this.storage.getObject({ Bucket: this.bucket, Key: key }).promise()

    return {
      buffer: file.Body as Buffer,
      size: file.ContentLength,
      mimetype: file.ContentType,
      originalname: key,
    }
  }

  async upload(file: IFile) {
    const response = await this.storage
      .upload({
        Bucket: this.bucket,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise()

    return { key: response.Key, success: true }
  }

  async delete(key: string) {
    await this.storage.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    return { success: true }
  }

  async getUrl(key: string) {
    const url = await this.storage.getSignedUrlPromise('getObject', {
      Bucket: this.bucket,
      Key: key
    })

    return url
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
