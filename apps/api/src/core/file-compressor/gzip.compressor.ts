import { gunzip, gzip } from 'zlib';


import { Compressor, TCompressFile } from "./compressor.interface";

export class GzipCompressor implements Compressor {
    async compress<T extends TCompressFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            gzip(value.buffer, (error, data) => {
                if (error) reject(error)
                resolve({ ...value, buffer: data, size: data.length })
            })
        })
    }
    decompress<T extends TCompressFile>(value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            gunzip(value.buffer, (error, data) => {
                if (error) reject(error)
                resolve({ ...value, buffer: data, size: data.length })
            })
        })
    }
}