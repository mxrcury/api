import { SetMetadata } from '@nestjs/common'

export const MakePublic = () => SetMetadata('isPublic', true)
