import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class SignUpDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(5)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `password is too weak`
  })
  password: string
}
