import { Readable } from "stream";

export abstract class Compressor {
    abstract compress<T extends TCompressFile>(value: T): Promise<T>
    abstract decompress<T extends TCompressFile>(value: T): Promise<T>
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

export type IDownloadedFile = Pick<IFile, 'buffer' | 'size' | 'mimetype' | 'originalname'>

export type TCompressFile = IFile | IDownloadedFile

export interface IFileCompressorOptions {
    image?: {
        largeFile?: {
            minSize: number
            quality: number
        }
        defaultCompressedQuality?: number
    }
}