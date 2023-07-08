import { AuthGuard } from '@core/guards/auth.guard'
import { UseGuards, applyDecorators } from '@nestjs/common'

export const Auth = () => {
  return applyDecorators(UseGuards(AuthGuard))
}
