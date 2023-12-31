import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from 'class-validator'

export class SignUpDto {
  @IsString()
  @ApiProperty({
    example: 'Name',
    required: true,
    type: String
  })
  name: string

  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
    type: String
  })
  email: string

  @IsString()
  @MinLength(5)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `password is too weak`
  })
  @ApiProperty({
    example: '1234passs2',
    required: true,
    type: String
  })
  password: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '321JdwdnwW22eSDASe2as',
    required: false,
    type: String,
    description: 'Token for invitation'
  })
  token?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1234',
    required: false,
    description: 'Confirmation code for sign up'
  })
  confirmationCode?: string
}
