import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mathbuster')
    .setDescription(
      "An old-school movie rental app, built with modern tech for Digital Ocean's 2021 MongoDB Hackathon",
    )
    .setVersion('1.0')
    .addTag('movies', 'Describes the Movie resource')
    .addTag('customers', 'Describes the Customer resource')
    .addTag('rentals', 'Describes the Rental resource')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Mathbuster API Reference',
  };

  SwaggerModule.setup('docs', app, document, customOptions);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
