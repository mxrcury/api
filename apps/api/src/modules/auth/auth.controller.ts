import { env } from '@configs'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto)
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res) {
    const token = await this.authService.signIn(dto)

    const cookieOptions = {
      httpOnly: true,
      domain: env.CLIENT_DOMAIN,
      maxAge: 30 * 24 * 3600 * 1000, // 30days
      secure: true
    }

    res.cookie('accessToken', token.accessToken, cookieOptions)

    return token
  }
}
