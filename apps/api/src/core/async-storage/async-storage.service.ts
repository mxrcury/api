import { ClsService } from 'nestjs-cls'

import { IUser } from '@core/interfaces'

import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AsyncStorageService {
  constructor(private readonly clsService: ClsService) {}

  getUser() {
    const user = this.clsService.get<IUser>('user')

    if (!user) throw new UnauthorizedException()

    return user
  }

  set<V>(key: string, value: V) {
    this.clsService.set(key, value)
  }
}
