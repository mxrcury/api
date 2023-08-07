import { storage as firebaseStorage, initializeApp } from 'firebase-admin';

import {
  FileStorage,
  IStorageOptions,
} from '../../file.interface';
import { IFile } from '../s3/s3.types';
import { SETTER_BUCKET_WRONG_VALUE } from './firebase.constants';
import { Storage, TFirebaseStorageOptions } from './firebase.types';

export class FirebaseStorage implements FileStorage {
  private storage: Storage

  constructor(options: TFirebaseStorageOptions) {
    initializeApp({ ...options, storageBucket: this.bucket });

    this.storage = firebaseStorage().bucket()
  }

  async delete(key: string) {
    await this.storage.file(key).delete({ ignoreNotFound: true })

    return {
      success: true
    }
  }

  async save(file: IFile) {
    await this.storage.file(file.originalname).save(file.buffer, { gzip: true, contentType: file.mimetype })

    const url = await this.storage.file(file.originalname).getSignedUrl({ expires: '03-09-2491', action: 'read' })

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
