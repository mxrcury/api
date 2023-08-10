import { Client, Storage } from 'appwrite';
import { InputFile } from 'node-appwrite';

import { FileStorage } from "../../file.interface";
import { IAppWriteStorageOptions, IFile } from './appwrite.types';

interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
}



export class AppWriteStorage implements FileStorage {
    private storage: Storage
    constructor(options: IAppWriteStorageOptions) {
        const client = new Client().setEndpoint(options.endpoint).setProject(options.projectId).setJWT(options.apiKey)

        this.storage = new Storage(client)

    }
    async save(file: IFile) {
        // const file = InputFile.fromBuffer(file.buffer, file.originalname)
        const response = await this.storage.createFile(this.bucket, file.originalname, InputFile.fromBuffer(file.buffer, file.filename) as File)
        const url = ''
        console.log(response)
        return {
            url,
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