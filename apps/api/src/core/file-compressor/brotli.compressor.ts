
import { IFile } from '@libs/file-storage';
import { brotliCompress, brotliDecompress } from 'zlib';
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
    decompress<T extends IFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            brotliDecompress(value.buffer, (error, data) => {
                if (error) reject(error)
                Object.assign(value, { buffer: data, size: data.length })
                resolve(value)
            })
        })
    }
}