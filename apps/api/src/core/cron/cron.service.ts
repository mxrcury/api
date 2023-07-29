import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CronService {
  private readonly logger = new Logger()

  @Cron(CronExpression.EVERY_10_SECONDS)
  async ping() {
    this.logger.debug('Pong')
  }
}
