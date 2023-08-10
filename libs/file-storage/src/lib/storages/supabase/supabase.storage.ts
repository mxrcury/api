import { StorageClient } from '@supabase/storage-js';

import { SETTER_BUCKET_WRONG_VALUE } from '../../file.constants';
import { IFile, ISupabaseStorageOptions } from './supabase.types';


export class SupabaseStorage {
    private storage: StorageClient
    constructor(options: ISupabaseStorageOptions) {
        const { projectUrl, apiKey } = options

        this.storage = new StorageClient(projectUrl, {
            apiKey: apiKey,
            Authorization: `Bearer ${apiKey}`,
        })
    }

    async upload(file: IFile) {
        const response = await this.storage.from(this.bucket).upload(file.originalname, file.buffer, { contentType: file.mimetype })
        if (response.error) throw new Error(response.error.message)

        const url = this.storage.from(this.bucket).getPublicUrl(response.data.path)

        return { url: url.data.publicUrl, success: true }
    }

    async delete(key: string) {

        await this.storage.from(this.bucket).remove([key])

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

    private $bucket: string
}
