import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    // Habilita validação global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Configura CORS
    app.enableCors();

    // Configura Swagger
    const config = new DocumentBuilder()
      .setTitle('Serverless Challenge API')
      .setDescription('API para gerenciamento de funcionários com autenticação JWT')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
    cachedServer = serverless(expressApp);
  }
  return cachedServer;
}

export const handler = async (event: any, context: any) => {
  const server = await bootstrapServer();
  return server(event, context);
};

