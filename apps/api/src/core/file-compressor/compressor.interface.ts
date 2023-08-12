import { Readable } from "stream";

export abstract class Compressor {
    abstract compress<T extends IFile>(value: T): Promise<T>
    abstract decompress<T extends IFile>(value: T): Promise<T>
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