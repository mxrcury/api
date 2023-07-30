import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class SendMailDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'example@gmail.com',
    description: 'Email of the user to send him'
  })
  to: string

  @IsString()
  @ApiProperty({
    required: true,
    example: 'Invitation',
    description: 'Title for the mail'
  })
  title: string

  @IsString()
  @ApiProperty({
    required: true,
    example: "I'm subject",
    description: 'Subject for the mail'
  })
  subject: string

  @IsString()
  @ApiProperty({
    required: true,
    example: 'Some text for text body',
    description: 'Text for the mail'
  })
  text: string

  @IsOptional()
  @ApiProperty({
    required: false,
    example: '<h1>Test</h1>',
    description: 'Html for the mail'
  })
  html?: string
}
