
import { IFile } from '@libs/file-storage';
import { brotliCompress } from 'zlib';
import { Compressor } from "./compressor.interface";

export class BrotliCompressor implements Compressor {
    async compress<T extends IFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            brotliCompress(value.buffer, (error, data) => {
                if (error) reject(error)
                Object.assign(value, { buffer: data, size: data.length })
                resolve(value)
            })
        })
    }
    decompress<T>(value: T): Promise<T> {
        throw new Error('Method not implemented.');
    }


}