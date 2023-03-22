import { Inject, Logger, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { endOfDay, format, startOfDay } from 'date-fns';
import { FindManyOptions, Between } from 'typeorm';
import { Jobs } from '../entity';
import { cronTimes } from '../environment/config';
import { JobsRepository } from '../jobs/jobs.repository';
import { NotificationRepository } from '../notification/notification.repository';
import { convertYYYYMMDDToDate } from '../notification/utils/date';

@Injectable()
export class CronService {
  constructor(private jobsRepository: JobsRepository, private subscriptionRepository: NotificationRepository) {}

  @Cron(cronTimes.startJob)
  async sendMailNewJobs() {
    try {
      const emails = await this.getEmails();
      if (emails.length > 0) {
        const jobs = await this.getJobs();
        if (jobs.length > 0) {
          const sentMail = emails.map(async (emailSubscriber) => {
            const { email } = emailSubscriber;
            return await this.subscriptionRepository.sendMail(email, jobs);
          });
          const resolve = await Promise.all(sentMail);
          return resolve;
        }
        return { error: false, message: 'There are not news jobs post to sent' };
      }
      return { error: false, message: 'There are not subscriptions to NewsLetter' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getJobs() {
    try {
      const dateNew = format(new Date(), 'yyyyMMdd');
      const allStartDate = startOfDay(convertYYYYMMDDToDate(dateNew));
      const allEndDate = endOfDay(convertYYYYMMDDToDate(dateNew));

      const findArg: FindManyOptions<Jobs> = {
        where: {
          createdAt: Between(allStartDate, allEndDate),
        },
      };
      return await this.jobsRepository.findJob(findArg);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEmails() {
    try {
      const queryData = { select: { email: true } };
      return await this.subscriptionRepository.getEmails(queryData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
