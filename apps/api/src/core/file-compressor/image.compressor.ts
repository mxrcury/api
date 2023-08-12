import sharp from 'sharp';

import { extname } from "path";

import { IFile } from "@libs/file-storage";


export class ImageCompressor {
    async compress(file: IFile, quality: number) {
        const extension = extname(file.originalname)
        switch (extension) {
            case '.jpeg':
            case '.jpg':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).jpeg({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.png':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).png({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.webp':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).webp({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.avif':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).avif({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.tiff':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).tiff({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.jp2':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).jp2({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.heif':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).heif({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            case '.jxl':
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).jxl({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
            default:
                return new Promise((resolve, reject) => {
                    try {
                        const buffer = sharp(file.buffer).webp({ quality }).toBuffer()
                        resolve(buffer)
                    } catch (error) {
                        reject(error)
                    }
                }) as Promise<Buffer> | Promise<never>
        }
    }
}