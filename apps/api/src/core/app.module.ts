import { PrismaModule } from '@libs/prisma'
import { AuthModule } from '@modules/auth'
import { TokenModule } from '@modules/token'
import { Module } from '@nestjs/common'
@Module({
  imports: [PrismaModule, AuthModule, TokenModule]
})
export class AppModule {}
