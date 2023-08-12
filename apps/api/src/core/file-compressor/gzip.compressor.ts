
import { gzip } from 'zlib';

import { IFile } from '@libs/file-storage';

import { Compressor } from "./compressor.interface";

export class GzipCompressor implements Compressor {
    async compress<T extends IFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            gzip(value.buffer, (error, data) => {
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