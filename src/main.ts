import { env } from '@configs';
import { AppModule } from '@core';
import { NestFactory } from '@nestjs/core';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
}
main();
