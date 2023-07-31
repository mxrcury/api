import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class InviteDto {
  @IsString()
  @ApiProperty({
    example: 'ADMIN',
    required: true,
    description: 'Role of the user to invite'
  })
  role: string

  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
    description: 'Email of the user to invite'
  })
  email: string
}
