import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import { FileStorage, IFile } from "../../file.interface";
import { IAzureStorageOptions } from "./azure.types";


export class AzureStorage implements FileStorage {
    private storage: ContainerClient

    public serviceClient: BlobServiceClient
    constructor(options: IAzureStorageOptions) {
        const sharedKeyCredential = new StorageSharedKeyCredential(options.accountName, options.accountKey);

        this.serviceClient = new BlobServiceClient(
            `https://${options.storageAccountName}.blob.core.windows.net`,
            sharedKeyCredential
        );
    }
    async save(file: IFile) {
        if (!this.storage) {
            this.storage = this.serviceClient.getContainerClient(this.bucket)
            if (!this.storage.exists()) throw new Error(`Container "${this.bucket} does not exist"`)
        }
        const response = await this.storage.uploadBlockBlob(file.originalname, file.buffer, file.size, { blobHTTPHeaders: { blobContentType: file.mimetype, blobContentEncoding: file.encoding } })

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
        const response = await this.storage.deleteBlob(key)

        console.log("DELETE response: ", response, '\n====\n')

        return {
            success: true
        }
    }
    get bucket(): string {
        return this.$bucket
    }
    set bucket(value: string) {
        this.$bucket = value
    }

    set options(value: IAzureStorageOptions) {
        this.$options = value
    }

    private $options: IAzureStorageOptions
    private $bucket: string
}