import { ClsModule } from 'nestjs-cls'

import { clsOptions } from '@configs/cls.config'
import { Global, Module } from '@nestjs/common'
import { AsyncStorageService } from './async-storage.service'

@Global()
@Module({
  imports: [ClsModule.forRoot(clsOptions)],
  providers: [AsyncStorageService],
  exports: [AsyncStorageService]
})
export class AsyncStorageModule {}
