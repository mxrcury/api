import { Client, InputFile, Storage } from 'node-appwrite';

import { FileStorage } from "../../file.interface";
import { IAppWriteStorageOptions, IFile } from './appwrite.types';

export class AppWriteStorage implements FileStorage {
    private storage: Storage
    constructor(options: IAppWriteStorageOptions) {
        const client = new Client().setEndpoint(options.endpoint).setProject(options.projectId).setKey(options.apiKey)

        this.storage = new Storage(client)

    }
    async save(file: IFile) {
        const inputFile = InputFile.fromBuffer(file.buffer, file.originalname)
        const response = await this.storage.createFile(this.bucket, file.originalname, inputFile)
        const url = await this.storage.

            console.log(url)
        return {
            url: '',
            success: true
        }
    }
    async delete(key: string) {
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

    set options(value: IAppWriteStorageOptions) {
        this.$options = value
    }

    private $options: IAppWriteStorageOptions
    private $bucket: string
}