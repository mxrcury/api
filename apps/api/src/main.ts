import cookieParser from 'cookie-parser'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { env } from '@configs'
import { AppModule } from '@core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

  const port = env.PORT

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mavy API')
    .setDescription('API with all modern backend features')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
