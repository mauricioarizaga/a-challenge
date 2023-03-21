import { HttpException, Injectable, Logger } from '@nestjs/common';
import { httpCodes } from '../constants/responseCodes';
import { RPC } from '../constants/rpc';
import { RedisRepository } from '../redis/redis.repository';
import { JobDTO } from './dto/job.dto';
import { JobsRepository } from './jobs.repository';

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
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
}
