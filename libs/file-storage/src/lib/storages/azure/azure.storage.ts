import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import { SETTER_BUCKET_WRONG_VALUE } from '../../file.constants';
import { IAzureStorageOptions, IFile } from "./azure.types";


export class AzureStorage {
    private storage: ContainerClient

    public serviceClient: BlobServiceClient
    constructor(options: IAzureStorageOptions) {
        const sharedKeyCredential = new StorageSharedKeyCredential(options.accountName, options.accountKey);

        this.serviceClient = new BlobServiceClient(
            `https://${options.storageAccountName}.blob.core.windows.net`,
            sharedKeyCredential
        );
    }
    async upload(file: IFile) {
        if (!this.storage) {
            this.storage = this.serviceClient.getContainerClient(this.bucket)
            if (!this.storage.exists()) throw new Error(`Container "${this.bucket} does not exist"`)
        }
        const response = await this.storage.uploadBlockBlob(file.originalname, file.buffer, file.size, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype,
                blobContentEncoding: file.encoding
            }
        })

        const url = response.blockBlobClient.url

        return {
            url,
            success: true
        }
    }
    async delete(key: string) {
        if (!this.storage) {
            this.storage = this.serviceClient.getContainerClient(this.bucket)
            if (!this.storage.exists()) throw new Error(`Container "${this.bucket} does not exist"`)
        }

        await this.storage.deleteBlob(key)

        return {
            success: true
        }
    }
    get bucket(): string {
        return this.$bucket
    }
    set bucket(value: string) {
        if (typeof value === 'string' && value.trim().length) {
            this.$bucket = value
            return
        }
        throw new Error(SETTER_BUCKET_WRONG_VALUE)
    }

    set options(value: IAzureStorageOptions) {
        this.$options = value
    }

    private $options: IAzureStorageOptions
    private $bucket: string
}