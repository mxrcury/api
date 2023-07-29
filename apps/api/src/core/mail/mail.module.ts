import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  // providers: [MailService],
  // exports: [MailService]
})
export class MailModule {}
