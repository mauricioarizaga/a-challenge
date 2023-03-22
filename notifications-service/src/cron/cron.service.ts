import { Inject, Logger, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { endOfDay, format, startOfDay } from 'date-fns';
import { FindManyOptions, Between } from 'typeorm';
import { Jobs } from '../entity';
import { cronTimes } from '../environment/config';
import { JobsRepository } from '../jobs/jobs.repository';
import { convertYYYYMMDDToDate } from '../notification/utils/date';

@Injectable()
export class CronService {
  constructor(@Inject(Logger) private readonly logger: Logger, private jobsRepository: JobsRepository) {}

  @Cron(cronTimes.startJob)
  async sendMailNewJobs(data) {
    try {
      this.logger.log({ value: { message: 'Emails Sent', error: false } });
      const jobs = await this.getJobs();
      return;
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
    const dateNew = format(new Date(), 'yyyyMMdd');
    const allStartDate = startOfDay(convertYYYYMMDDToDate(dateNew));
    const allEndDate = endOfDay(convertYYYYMMDDToDate(dateNew));

    const findArg: FindManyOptions<Jobs> = {
      where: {
        createdAt: Between(allStartDate, allEndDate),
      },
    };
    console.log(allEndDate, allStartDate, dateNew);
    const queryData = {
      where: {
        createdAt: Between(allStartDate, allEndDate),
      },
    };
    return await this.jobsRepository.findJob(findArg);
  }
}
