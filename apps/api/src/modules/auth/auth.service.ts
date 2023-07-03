import { Injectable } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  async signUp(dto: SignUpDto) {
    const { email, name, password } = dto

    console.log(dto)
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto

    console.log(dto)
  }
}
