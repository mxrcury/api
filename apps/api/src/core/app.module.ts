import { PrismaModule } from '@libs/prisma';
import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';
@Module({
  imports: [PrismaModule, AuthModule],
})
export class AppModule {}
