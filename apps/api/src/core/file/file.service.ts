import { env } from '@configs/env.config'
import { Injectable, OnModuleInit } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { extname } from 'path'
import { FileStorage, Response } from './file.interface'

@Injectable()
export class FileService implements FileStorage, OnModuleInit {
  private storage: AWS.S3
  onModuleInit() {
    this.storage = new AWS.S3({
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    })
  }
  async delete(key: string): Promise<Response> {
    await this.storage
      .deleteObject({ Bucket: env.AWS_BUCKET_NAME, Key: key })
      .promise()

    return {
      status: 204
    }
  }
  async save(file: Express.Multer.File): Promise<Response> {
    const baseFileName = file.originalname.slice(
      0,
      file.originalname.lastIndexOf('.')
    )
    const ext = extname(file.originalname)
    const fileName = `${baseFileName}_${Date.now()}${ext})}`

    const response = await this.storage
      .upload({
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
      })
      .promise()

    const url = await this.storage.getSignedUrlPromise('getObject', {
      Bucket: env.AWS_BUCKET_NAME,
      Key: response.Key
    })
    return {
      url,
      status: 201
    }
  }
}
