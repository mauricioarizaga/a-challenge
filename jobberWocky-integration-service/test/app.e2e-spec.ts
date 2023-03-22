import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/nestConfig/app.module';
import { httpCodes } from '../src/constants/responseCodes';
import { emptyArray, jobsSeed } from './seeds/db';

describe('JobberWockyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs (GET)', () => {
    return request(app.getHttpServer()).get('/jobs').expect({ status: httpCodes.ok200, data: jobsSeed });
  });
  it('/jobs?name=bicicleta (GET)', () => {
    return request(app.getHttpServer()).get('/jobs?name=bicicleta').expect({ status: httpCodes.notFound404, data: emptyArray });
  });
});
