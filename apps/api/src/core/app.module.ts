import { PrismaModule } from '@libs/prisma';
import { Module } from '@nestjs/common';
@Module({
  imports: [PrismaModule],
})
export class AppModule {}
