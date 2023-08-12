import { cookieOptions } from '@configs'
import { AsyncStorageService } from '@core/async-storage'
import { Auth, Roles } from '@core/decorators'
import { IFile } from '@libs/file-storage'
import { Role } from '@modules/role'
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { InviteDto } from './dto/invite.dto'
import { SendMailDto } from './dto/send-mail.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private asyncStorage: AsyncStorageService
  ) { }

  @Post('sign-up')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto)
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res) {
    const token = await this.authService.signIn(dto)

    res.cookie('token', token.accessToken, cookieOptions)
  }

  @Post('generate-invite')
  async generateInvite(@Body() dto: InviteDto) {
    return this.authService.generateInvite(dto)
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to S3' })
  upload(@UploadedFile() file: IFile) {
    return this.authService.uploadFile(file)
  }

  @Post('compress-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Compress file' })
  compress(@UploadedFile() file: IFile) {
    return this.authService.compressFile(file)
  }

  @Post('decompress-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Decompress file' })
  decompress(@UploadedFile() file: IFile) {
    return this.authService.decompressFile(file)
  }
}
