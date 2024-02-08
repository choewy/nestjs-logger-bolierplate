import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './utils/logger/logger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger().create(),
  });

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(new Logger()));

  await app.listen(3000);
}

bootstrap();
