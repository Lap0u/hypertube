import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('HYPERTUBE')
    .setDescription('The hypertube API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
