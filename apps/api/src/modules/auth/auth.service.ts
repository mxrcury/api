import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  async signUp(dto: SignUpDto) {
    const { email, name, password } = dto;
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
  }
}
