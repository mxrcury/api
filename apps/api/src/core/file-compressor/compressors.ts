import { GZIP_COMPRESSION } from "./compressor.constants";
import { FileCompressor } from "./compressor.service";
import { GzipCompressor } from "./gzip.compressor";

export const GzipCompressorService = {
    provide: GZIP_COMPRESSION,
    useFactory: () => {
        return new FileCompressor(new GzipCompressor())
    }
}