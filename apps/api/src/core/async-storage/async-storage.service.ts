import { ClsService } from 'nestjs-cls'

import { IUser } from '@core/interfaces'

import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AsyncStorageService extends ClsService {
  getUser() {
    const user = this.get<IUser>()

    if (!user) throw new UnauthorizedException()

    return user
  }
}
