import { FileService } from '@core/file'
import { LOCAL_STORAGE } from '@core/file/file.contants'
import { LocalStorage } from '@core/file/storages/local.storage'
import { TokenModule, TokenService } from '@modules/token'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: LOCAL_STORAGE,
      useFactory() {
        return new FileService({
          storage: new LocalStorage({
            localFolder: 'public'
          }),
          bucket: 'photos'
        })
      }
    }
  ]
})
export class AuthModule {}
