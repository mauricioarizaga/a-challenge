import { JobsController } from '../src/jobs/jobs.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/nestConfig/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../src/environment/config';
import { arrayControllers, arrayEntities, arrayProviders } from '../src/nestConfig/arrayDependency';
import { newPostJob } from './seeds/db';

describe('Check if Jobs controller works correctly ', () => {
  let service: AppService;
  let jobsController: JobsController;

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
    jobsController = module.get<JobsController>(JobsController);
  });

  it('Check if app service is defined', () => {
    expect(service).toBeDefined();
  });

  it('Test if saveJob method works', async () => {
    expect(await jobsController.saveJob(newPostJob)).not.toEqual(null);
  });
  it('Test if saveJob response 201', async () => {
    const result = await jobsController.saveJob(newPostJob);
    const { data } = result;
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('data');
    expect(typeof data).toEqual('object');
  });
});
