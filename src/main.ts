import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT || 3001);

  app.enableCors();

  const globalPrefix = 'api/v1';

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription(
      'Documentacion de la API de NestJS para el proyecto de renta de autos',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(port, () => {
    Logger.log(
      `Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
    Logger.log(`Swagger is running on: http://localhost:${port}/api`);
  });
}
bootstrap();
