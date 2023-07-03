import { env } from '@configs/env.config'
import { AppModule } from '@core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

  const port = env.PORT

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
