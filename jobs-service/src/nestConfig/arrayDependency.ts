import { Logger } from '@nestjs/common';
import { Jobs } from '../jobs/entity';
import { JobsController } from '../jobs/jobs.controller';
import { JobsRepository } from '../jobs/jobs.repository';
import { JobsService } from '../jobs/jobs.service';
import { JobberServiceProxy } from '../proxies';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const arrayEntities = [Jobs];
export const arrayControllers = [AppController, JobsController];
export const arrayProviders = [AppService, Logger, JobsService, JobsRepository, JobberServiceProxy];
