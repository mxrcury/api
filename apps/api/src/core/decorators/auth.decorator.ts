import { AuthGuard } from '@core/guards/auth.guard'
import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

export const Auth = () => {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth)
}
