import { NotificationController } from '../src/notification/notification.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/nestConfig/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../src/environment/config';
import { arrayControllers, arrayEntities, arrayProviders } from '../src/nestConfig/arrayDependency';
import { email } from './seeds/db';

describe('Check if Jobs controller works correctly ', () => {
  let service: AppService;
  let notificationController: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: arrayProviders,
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.dbName,
          entities: arrayEntities,
          synchronize: dbConfig.synchronize === 'true' ? true : false,
          logging: dbConfig.logging === 'true' ? true : false,
        }),
        TypeOrmModule.forFeature(arrayEntities),
      ],
      controllers: arrayControllers,
    }).compile();

    service = module.get<AppService>(AppService);
    notificationController = module.get<NotificationController>(NotificationController);
  });

  it('Check if app service is defined', () => {
    expect(service).toBeDefined();
  });

  it('Test if saveEmailSubscriber method works', async () => {
    expect(await notificationController.saveEmailSubscriber(email)).not.toEqual(null);
  });
  it('Test if saveEmailSubscriber response 201', async () => {
    const result = await notificationController.saveEmailSubscriber(email);
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('id');
  });
});
