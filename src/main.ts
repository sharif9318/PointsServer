import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sheron: Points API')
    .setDescription(
      'A secure and lightweight API for managing user points, balance tracking, and point-earning history for the PrismX assignment.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Sheron',
      'https://prismx.com',
      'sharif.dilmuratovich@gmail.com',
    )
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://api.prismx.com', 'Production')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
