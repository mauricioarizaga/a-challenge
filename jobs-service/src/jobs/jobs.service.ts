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
      const id = String(Date.now() / 1000);
      await this.redisRepository.setData(id, job);
      const result = await this.redisRepository.getData(id);
      // console.log({ id, job });
      console.log({ result: JSON.parse(result) });

      return { savedJob, status: httpCodes.created201, result: JSON.parse(result) };
    } catch (error) {
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
  async sentNotificationUser(savedJob: JobDTO) {
    return await this.jobsRepository.connectUserService(RPC.NEW_JOB_POST, savedJob, 10000);
  }
}
