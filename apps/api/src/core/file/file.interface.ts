import '@types/multer'
import { S3 } from 'aws-sdk'

export interface IResponse {
  url?: string
  success: boolean
  errorMessage?: string
}

export type TS3StorageOptions = S3.Types.ClientConfiguration
export interface IFirebaseStorageOptions {
  fireStoreKey: string
}

export interface ILocalStorageOptions {
  localFolder: string
}

export interface IStorageOptions {
  fileLimit?: {
    limit: number
    perSeconds: number
  }
}

export interface IFileServiceOptions extends IStorageOptions {
  storage: FileStorage
  bucket: string
}

export abstract class FileStorage {
  abstract save(file: Express.Multer.File): Promise<IResponse>
  abstract delete(key: string): Promise<IResponse>

  abstract get bucket(): string
  abstract set bucket(value: string)
  abstract set options(value: IStorageOptions)
}
