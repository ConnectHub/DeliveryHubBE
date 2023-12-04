import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './infra/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createLogger, transports, format } from 'winston';
import { PrismaClientExceptionFilter } from './infra/filters/prisma-client.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const logger = createLogger({
    transports: [new transports.File({ filename: 'logs/logs.log' })],
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
  });
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalFilters(new PrismaClientExceptionFilter(logger));
  app.enableShutdownHooks();
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('DeliveryHub API')
    .setDescription('The DeliveryHub API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
}
bootstrap();
