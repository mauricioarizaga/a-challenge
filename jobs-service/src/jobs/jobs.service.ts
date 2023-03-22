import { HttpException, Injectable, Logger } from '@nestjs/common';
import { startOfDay, endOfDay, format } from 'date-fns';
import { Between, FindManyOptions } from 'typeorm';
import { httpCodes } from '../constants/responseCodes';
import { RPC } from '../constants/rpc';
import { RedisRepository } from '../redis/redis.repository';
import { JobDTO } from './dto/job.dto';
import { JobsRepository } from './jobs.repository';
import { convertYYYYMMDDToDate } from './utils/date';

@Injectable()
export class JobsService {
  constructor(private readonly logger: Logger, private readonly jobsRepository: JobsRepository, private redisRepository: RedisRepository) {}
  async saveJob(job: JobDTO) {
    try {
      this.logger.log({
        message: 'Save Job Service',
        job,
        error: false,
      });
      const savedJob = await this.jobsRepository.saveJob(job);
      const dateNew = format(new Date(), 'yyyyMMdd');
      const allStartDate = startOfDay(convertYYYYMMDDToDate(dateNew));
      const allEndDate = endOfDay(convertYYYYMMDDToDate(dateNew));

      console.log(allEndDate, allStartDate, dateNew);
      const queryData = {
        where: {
          createdAt: Between(allStartDate, allEndDate),
        },
      };
      const getJobs = await this.getJobs(queryData);
      console.log({ getJobs });
      return { status: httpCodes.created201, data: savedJob };
    } catch (error) {
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
  async sentNotificationUser(savedJob: JobDTO) {
    return await this.jobsRepository.connectUserService(RPC.NEW_JOB_POST, savedJob, 10000);
  }
  async getJobs(queryData) {
    try {
      console.log({ queryData });
      return await this.jobsRepository.findJob(queryData);
    } catch (error) {
      console.log({ error });
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
}
