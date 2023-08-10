import { Client, InputFile, Storage } from 'node-appwrite';

import { SETTER_BUCKET_WRONG_VALUE } from '../../file.constants';
import { FileStorage } from "../../file.interface";
import { IAppWriteStorageOptions, IFile, TAppWriteOptions } from './appwrite.types';

export class AppWriteStorage implements FileStorage {
    private storage: Storage
    private client: Client
    constructor(options: IAppWriteStorageOptions) {
        const { apiKey, ...appwriteOptions } = options
        this.client = new Client().setEndpoint(appwriteOptions.endpoint).setProject(appwriteOptions.projectId).setKey(apiKey)

        this.storage = new Storage(this.client)
        this.options = appwriteOptions
    }
    async upload(file: IFile) {
        const inputFile = InputFile.fromBuffer(file.buffer, file.originalname)
        const response = await this.storage.createFile(this.bucket, file.originalname, inputFile)

        const url = `${this.options.endpoint}/storage/buckets/${this.bucket}/files/${response.$id}/view?project=${this.options.projectId}&mode=admin`

        return {
            url,
            success: true
        }
    }
    async delete(key: string) {

        await this.storage.deleteFile(this.bucket, key)

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

    get options() {
        return this.$options
    }

    set options(value: TAppWriteOptions) {
        this.$options = value
    }

    private $options: TAppWriteOptions
    private $bucket: string
}