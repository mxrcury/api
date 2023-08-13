

import { imageMimetypes } from './compressor.constants';
import { Compressor, IFileCompressorOptions, TCompressFile } from "./compressor.interface";
import { ImageCompressor } from './image.compressor';

export class FileCompressor {
    constructor(public compressor: Compressor, options?: IFileCompressorOptions, private readonly imageCompressor = new ImageCompressor()) {
        this.options = options
    }
    async compress(file: TCompressFile) {
        if (imageMimetypes[file.mimetype]) {
            const imageOptions = this.options?.image || {}
            const minSizeLargeOfFileToDecQuality = imageOptions?.largeFile.minSize || 1024 * 5
            const decreasedQualityLargeFile = imageOptions?.largeFile.quality || 60
            const defaultCompressedQuality = imageOptions?.defaultCompressedQuality || 80

            const quality = file.size > minSizeLargeOfFileToDecQuality * 1000 ? decreasedQualityLargeFile : defaultCompressedQuality
            const buffer = await this.imageCompressor.compress(file, quality)

            return { ...file, buffer, size: buffer.length }
        } else {
            return this.compressor.compress(file)
        }
    }
    async decompress(value: TCompressFile) {
        if (imageMimetypes[value.mimetype]) throw new Error('Image decompression is not supported')
        return this.compressor.decompress(value)
    }

    private options: IFileCompressorOptions
}