import { INestApplication, Injectable } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerService {
  static init(app: INestApplication) {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Mavy API')
      .setDescription('API with all modern backend features')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)

    SwaggerModule.setup('api/docs', app, document)
  }
}
