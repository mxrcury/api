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
  success: boolean
  errorMessage?: string
}

type TFileNamePatterns = string | number | Date

export interface IStorageOptions {
  limits?: {
    uploadingLimit?: {
      filesQty: number
      perSec: number
    }
    extensions?: {
      include?: string[]
      exclude?: string[]
    }
  }
  naming?: {
    prefix?: TFileNamePatterns
    postfix?: TFileNamePatterns
    baseName?: boolean
    random?: boolean
    date?: boolean // if false it will generate additionally some random characters to make file unique
  }
}

export interface IFileServiceOptions extends IStorageOptions {
  storage: FileStorage
  bucket: string
}

export abstract class FileStorage {
  abstract save(file: IFile): Promise<IResponse>
  abstract delete(key: string): Promise<IResponse>

  abstract get bucket(): string
  abstract set bucket(value: string)
}
