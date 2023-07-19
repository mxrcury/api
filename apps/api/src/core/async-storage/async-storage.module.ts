import { ClsModule } from 'nestjs-cls'

import { Global, Module } from '@nestjs/common'
import { AsyncStorageService } from './async-storage.service'

@Global()
@Module({
  imports: [ClsModule.forRoot()],
  providers: [AsyncStorageService],
  exports: [AsyncStorageService]
})
export class AsyncStorageModule {}
