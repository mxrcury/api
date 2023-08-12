import { Inject } from "@nestjs/common";

import { BROTLI_COMPRESSION, GZIP_COMPRESSION } from "./compressor.constants";

export const InjectGzipCompression = () => Inject(GZIP_COMPRESSION);
export const InjectBrotliCompression = () => Inject(BROTLI_COMPRESSION);