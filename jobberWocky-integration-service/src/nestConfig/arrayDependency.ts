import { Logger } from '@nestjs/common';
import { JobberWockyController } from '../jobber/jobber.controller';
import { JobberWockyRepository } from '../jobber/jobber.repository';
import { JobberWockyService } from '../jobber/jobber.service';
import { AppService } from './app.service';

export const arrayControllers = [JobberWockyController];
export const arrayProviders = [AppService, Logger, JobberWockyRepository, JobberWockyService];
