import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SignInDto {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
    type: String
  })
  email: string

  @IsString()
  @ApiProperty({
    example: '123456pasSS',
    required: true,
    type: String
  })
  password: string
}
