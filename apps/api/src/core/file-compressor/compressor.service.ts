
import { IFile } from '@libs/file-storage';

import { imageMimetypes } from './compressor.constants';
import { Compressor, IFileCompressorOptions } from "./compressor.interface";
import { ImageCompressor } from './image.compressor';

export class FileCompressor {
    constructor(public compressor: Compressor, options?: IFileCompressorOptions, private readonly imageCompressor = new ImageCompressor()) {
        this.options = options
    }
    async compress(file: IFile) {
        if (imageMimetypes[file.mimetype]) {
            const imageOptions = this.options?.image || {}
            const minSizeLargeOfFileToDecQuality = imageOptions?.largeFile.minSize || 1024 * 5
            const decreasedQualityLargeFile = imageOptions?.largeFile.quality || 60
            const defaultCompressedQuality = imageOptions?.defaultCompressedQuality || 80

            const quality = file.size > minSizeLargeOfFileToDecQuality * 1000 ? decreasedQualityLargeFile : defaultCompressedQuality
            const buffer = await this.imageCompressor.compress(file, quality)
            Object.assign(file, { buffer, size: buffer.length })

            return file
        } else {
            return await this.compressor.compress(file)
        }
    }
    decompress(value: IFile) {
        if (imageMimetypes[value.mimetype]) throw new Error('Image decompression is not supported')
        return this.compressor.decompress(value)
    }

    private options: IFileCompressorOptions
}