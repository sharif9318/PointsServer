import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PrismX Points API')
    .setDescription(
      'A secure and lightweight API for managing user points, balance tracking, and point-earning history for the PrismX assignment.',
    )
    .setVersion('1.0.0')
    .setContact('PrismX Support', 'https://prismx.com', 'support@prismx.com')
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
