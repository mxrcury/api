import { Readable } from 'stream';
export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
export interface IResponse {
  url?: string
  key?: string
  success: boolean
  error?: {
    message: string
  }
}

type TFileNamePatterns = string | number | Date

export interface IStorageOptions {
  limits?: {
    uploadingLimit?: {
      filesQty: number
      perSec: number
    }
    size?: number // in kilobytes
    extensions: {
      include?: string[]
      exclude?: string[]
    } | '*'
  }
  naming?: {
    prefix?: TFileNamePatterns
    postfix?: TFileNamePatterns
    baseName?: boolean
    random?: boolean
    date?: boolean
    default?: boolean
  }
  include: {
    url: boolean
    key?: boolean
  }
  // TODO: add toggling url in response or if it will be only upload, cause in some storages it can take additional request and time
}

export interface IFileServiceOptions extends IStorageOptions {
  storage: FileStorage
  bucket: string
}

export abstract class FileStorage {
  abstract upload(file: IFile): Promise<IResponse>
  abstract delete(key: string): Promise<IResponse>
  abstract getUrl?(key: string): Promise<string> // TODO: also implement it for url toggling

  abstract get bucket(): string
  abstract set bucket(value: string)
}
