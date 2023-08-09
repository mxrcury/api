// import { AppOptions } from "firebase-admin";
import { Readable } from "stream";

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

export interface IFirebaseStorageOptions { clientEmail: string, privateKey: string, projectId: string }