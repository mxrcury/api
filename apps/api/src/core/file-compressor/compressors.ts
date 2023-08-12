import { FileCompressor } from "./compressor.service";
import { GzipCompressor } from "./gzip.compressor";

export const gzipCompressorService = new FileCompressor(new GzipCompressor())
export const brotliCompressorService = () => new FileCompressor(new GzipCompressor())