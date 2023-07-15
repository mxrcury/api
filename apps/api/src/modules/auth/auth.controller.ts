import { cookieOptions } from '@configs'
import { Body, Controller, Post, Query, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() dto: SignUpDto, @Query('token') token?: string) {
    return this.authService.signUp(dto, token)
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res) {
    const token = await this.authService.signIn(dto)

    res.cookie('token', token.accessToken, cookieOptions)

    return token
  }
}
