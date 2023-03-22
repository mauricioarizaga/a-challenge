import { Logger } from '@nestjs/common';
import { CronService } from '../cron/cron.service';
import { SubscriptionJobs, Jobs } from '../entity';
import { JobsRepository } from '../jobs/jobs.repository';
import { NotificationController } from '../notification/notification.controller';
import { NotificationRepository } from '../notification/notification.repository';
import { NotificationService } from '../notification/notification.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const arrayControllers = [AppController, NotificationController];
export const arrayProviders = [AppService, Logger, NotificationService, NotificationRepository, CronService, JobsRepository];
export const arrayEntities = [SubscriptionJobs, Jobs];
