import { cookieOptions } from '@configs'
import { AsyncStorageService } from '@core/async-storage'
import { Auth, Roles } from '@core/decorators'
import { Role } from '@modules/role'
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SendMailDto } from './dto/send-mail.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private asyncStorage: AsyncStorageService
  ) {}

  @Post('sign-up')
  signup(@Body() dto: SignUpDto, @Query('token') token?: string) {
    return this.authService.signUp(dto, token)
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res) {
    const token = await this.authService.signIn(dto)

    res.cookie('token', token.accessToken, cookieOptions)
  }

  @Get('me')
  @Auth()
  @ApiOperation({ summary: 'Get current user' })
  get() {
    return this.asyncStorage.getUser()
  }

  @Post('send-mail')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: 'Send email from server, allowed only for admins' })
  sendMail(@Body() dto: SendMailDto) {
    return this.authService.sendMail(dto)
  }
}
