
import { IFile } from '@libs/file-storage';
import { Compressor } from "./compressor.interface";
import { ImageCompressor } from './image.compressor';

const imageMimetypes = {
    'image/jpeg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true,
    'image/svg+xml': true,
    'image/tiff': true,
    'image/bmp': true,
    'image/x-icon': true,
    'image/vnd.microsoft.icon': true,
    'image/avif': true,
    'image/apng': true,
    'image/flif': true,
    'image/x-portable-anymap': true,
    'image/x-portable-bitmap': true,
    'image/x-portable-graymap': true,
    'image/x-portable-pixmap': true,
    'image/x-canon-cr2': true,
    'image/x-canon-crw': true,
    'image/x-fujifilm-raf': true,
    'image/x-jg': true,
    'image/x-nikon-nef': true,
    'image/x-olympus-orf': true,
}

export class FileCompressor {
    constructor(public compressor: Compressor, private readonly imageCompressor = new ImageCompressor()) { }
    async compress(file: IFile) {
        if (imageMimetypes[file.mimetype]) {
            const quality = file.size > 1000000 ? 60 : 80
            const buffer = await this.imageCompressor.compress(file, quality)
            Object.assign(file, { buffer, size: buffer.length })

            return file
        } else {
            return await this.compressor.compress(file)
        }
    }
    decompress<T>(value: T): Promise<T> {
        throw new Error('Method not implemented.');
    }


}