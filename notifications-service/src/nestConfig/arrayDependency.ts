import { Logger } from '@nestjs/common';
import { CronService } from '../cron/cron.service';
import { EventRepository } from '../event/event.repository';
import { EventService } from '../event/event.service';
import { SubscriptionJobs } from '../notification/entity';
import { NotificationController } from '../notification/notification.controller';
import { NotificationRepository } from '../notification/notification.repository';
import { NotificationService } from '../notification/notification.service';
import { RedisRepository } from '../redis/redis.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const arrayControllers = [AppController, NotificationController];
export const arrayProviders = [
  AppService,
  Logger,
  NotificationService,
  NotificationRepository,
  CronService,
  EventRepository,
  EventService,
  RedisRepository,
];
export const arrayEntities = [SubscriptionJobs];
