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
  fileLimit?: {
    limit: number
    perSeconds: number
  }
  file?: {
    prefix?: TFileNamePatterns
    postfix?: TFileNamePatterns
    includeBaseName?: boolean
    generateRandomName?: boolean
    includeDate?: boolean // if false it will generate additionally some random characters to make file unique
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
