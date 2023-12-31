import { Readable } from "stream";

export interface IAzureStorageOptions {
    accountName: string
    accountKey: string
    storageAccountName: string
}

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