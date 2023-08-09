import { credential, storage as firebaseStorage } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

import {
  IStorageOptions
} from '../../file.interface';
import { IFile } from '../s3/s3.types';
import { SETTER_BUCKET_WRONG_VALUE } from './firebase.constants';
import { IFirebaseStorageOptions } from './firebase.types';

export class FirebaseStorage {
  private storage

  constructor(options: IFirebaseStorageOptions) {
    const { clientEmail, privateKey, projectId } = options
    initializeApp({ credential: credential.cert({ clientEmail, privateKey, projectId }) })
  }

  async delete(key: string) {
    if (!this.storage) this.storage = firebaseStorage().bucket(this.bucket)

    await this.storage.file(key).delete({ ignoreNotFound: true })

    return {
      success: true
    }
  }

  async save(file: IFile) {
    if (!this.storage) this.storage = firebaseStorage().bucket(this.bucket)

    await this.storage.file(file.originalname).save(file.buffer, { gzip: true, contentType: file.mimetype })
    const url = await this.storage.file(file.originalname).getSignedUrl({ expires: '03-09-2491', action: 'read' }) // move expires and action to firebase additional options

    return {
      url: url[0],
      success: true
    }
  }

  set options(value: IStorageOptions) {
    this.$options = value
  }

  set bucket(value: string) {
    if (typeof value === 'string' && value.trim().length) {
      this.$bucket = value
      return
    }
    throw new Error(SETTER_BUCKET_WRONG_VALUE)
  }

  get bucket() {
    return this.$bucket
  }

  private $options: IStorageOptions
  private $bucket: string
}