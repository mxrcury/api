import { env } from "./env.config";
import * as admin from './firebase-admin.json';

export const firebaseConfig = {
    privateKey: admin.private_key,
    projectId: admin.project_id,
    clientEmail: admin.client_email,
}
export const azureConfig = {
    accountName: env.AZURE_ACCOUNT_NAME,
    accountKey: env.AZURE_ACCOUNT_KEY,
    storageAccountName: env.AZURE_STORAGE_ACCOUNT_NAME
}

export const localStorageConfig = {
    localFolder: 'public'
}

export const s3Config = {
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
}

export const appWriteConfig = { projectId: env.APPWRITE_PROJECT_ID, endpoint: env.APPWRITE_ENDPOINT, apiKey: env.APPWRITE_API_KEY }

export const supabaseConfig = { apiKey: env.SUPABASE_API_KEY, projectUrl: env.SUPABASE_ENDPOINT }