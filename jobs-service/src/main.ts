import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './nestConfig/app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      defaultMeta: { service: 'Avature MS: Notification' },
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nestWinstonModuleUtilities.format.nestLike()),
        }),
      ],
    }),
  });
  app.enableCors();
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Jobs-Service')
      .setDescription('The Jobs-Service API description')
      .setVersion('1.0')
      .addTag('Jobs')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('jobs/docs', app, document);
  }

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.JOBS_PORT),
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.API_PORT);
  console.log(`JOBS-SERVICE: ${process.env.API_PORT}`);
}
bootstrap();
