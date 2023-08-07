import { AppOptions, storage as firebaseStorage } from "firebase-admin";
import { Readable } from "stream";

const storage = firebaseStorage().bucket

export type Storage = ReturnType<typeof storage>

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

export type TFirebaseStorageOptions = AppOptions