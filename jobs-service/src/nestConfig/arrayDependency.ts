import { Logger } from '@nestjs/common';
import { EventRepository } from '../event/event.repository';
import { EventService } from '../event/event.service';
import { Jobs } from '../jobs/entity';
import { JobsController } from '../jobs/jobs.controller';
import { JobsRepository } from '../jobs/jobs.repository';
import { JobsService } from '../jobs/jobs.service';
import { NotificationServiceProxy } from '../proxies';
import { RedisRepository } from '../redis/redis.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const arrayEntities = [Jobs];
export const arrayControllers = [AppController, JobsController];
export const arrayProviders = [
  AppService,
  Logger,
  JobsService,
  JobsRepository,
  NotificationServiceProxy,
  EventService,
  EventRepository,
  RedisRepository,
];
