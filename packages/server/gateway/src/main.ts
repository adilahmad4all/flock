/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
   app.enableCors({
        origin: "*",
        credentials: false,
      });
  await app.listen(port);
  Logger.log(
    `🚀 Gateway Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
