import cookieParser from 'cookie-parser'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { env } from '@configs'
import { AppModule } from '@core/app.module'
import { SwaggerService } from '@core/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

  const port = env.PORT

  SwaggerService.init(app)

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
