import { DynamicModule, Module } from "@nestjs/common";
import { BrotliCompressor } from "./brotli.compressor";
import { BROTLI_COMPRESSION, GZIP_COMPRESSION } from "./compressor.constants";
import { FileCompressor } from "./compressor.service";
import { GzipCompressor } from "./gzip.compressor";

@Module({})
export class CompressorModule {
    static forRoot(): DynamicModule {
        const providers = [
            {
                provide: GZIP_COMPRESSION,
                useValue: new FileCompressor(new GzipCompressor())
            },
            {
                provide: BROTLI_COMPRESSION,
                useValue: new FileCompressor(new BrotliCompressor())
            }
        ]
        return {
            module: CompressorModule,
            providers,
            exports: providers,
            global: true
        }
    }
}