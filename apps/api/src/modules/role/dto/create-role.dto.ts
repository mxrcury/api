import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @ApiProperty({
    required: true,
    example: 'GUEST',
    description: 'Name of the role'
  })
  name: string
}
