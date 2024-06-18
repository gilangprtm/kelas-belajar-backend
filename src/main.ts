import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Memuat variabel lingkungan dari file .env
  const app = await NestFactory.create(AppModule); // Membuat aplikasi Nest.js

  const config = new DocumentBuilder()
    .setTitle('Kelas Belajar API')
    .setDescription('API Documentation for Kelas Belajar')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build(); // Membuat dokumentasi swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Menetapkan dokumentasi ke aplikasi

  await app.listen(3000);
}
bootstrap();
