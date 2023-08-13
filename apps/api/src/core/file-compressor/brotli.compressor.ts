
import { brotliCompress, brotliDecompress } from 'zlib';
import { Compressor, TCompressFile } from "./compressor.interface";

export class BrotliCompressor implements Compressor {
    async compress<T extends TCompressFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            brotliCompress(value.buffer, (error, data) => {
                if (error) reject(error)
                resolve({ ...value, buffer: data, size: data.length })
            })
        })
    }
    decompress<T extends TCompressFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            brotliDecompress(value.buffer, (error, data) => {
                if (error) reject(error)
                resolve({ ...value, buffer: data, size: data.length })
            })
        })
    }
}