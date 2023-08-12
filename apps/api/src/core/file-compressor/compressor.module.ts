import { DynamicModule, Module } from "@nestjs/common";
import { BrotliCompressor } from "./brotli.compressor";
import { BROTLI_COMPRESSION, GZIP_COMPRESSION } from "./compressor.constants";
import { IFileCompressorOptions } from "./compressor.interface";
import { FileCompressor } from "./compressor.service";
import { GzipCompressor } from "./gzip.compressor";

@Module({})
export class FileCompressorModule {
    static forRoot(options?: IFileCompressorOptions): DynamicModule {
        const providers = [
            {
                provide: GZIP_COMPRESSION,
                useValue: new FileCompressor(new GzipCompressor(), options)
            },
            {
                provide: BROTLI_COMPRESSION,
                useValue: new FileCompressor(new BrotliCompressor(), options)
            }
        ]
        return {
            module: FileCompressorModule,
            providers,
            exports: providers,
            global: true
        }
    }
}