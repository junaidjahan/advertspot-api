import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WsAdapter } from './ws.adapter';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true
    })
  );

  // app.useGlobalFilters(new MongooseExceptionFilter());
  app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Advertspot API')
    .setDescription('Advertspot API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('/explorer', app, SwaggerModule.createDocument(app, config));

  const port = process.env.PORT || 5000;
  await app.listen(port);

  new Logger('NestApplication').log(`Server 🚀 running at http://localhost:${port}`);
})();
