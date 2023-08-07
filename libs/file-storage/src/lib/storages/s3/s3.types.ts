import { S3 } from "aws-sdk";
import { Readable } from "stream";

export type TS3StorageOptions = S3.Types.ClientConfiguration

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