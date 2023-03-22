import { HttpException, Injectable, Logger } from '@nestjs/common';
import { httpCodes } from '../constants/responseCodes';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(private readonly logger: Logger, private readonly jobsRepository: JobsRepository) {}
  async getJobs(name: string, salary_min: number, salary_max: number, country: string) {
    try {
      this.logger.log({
        message: 'Save Job Service',
        name,
        salary_max,
        salary_min,
        country,
        error: false,
      });
      const savedJob = await this.jobsRepository.findJobsByParams(name, salary_max, salary_min, country);
      return { status: httpCodes.created201, data: savedJob };
    } catch (error) {
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
}
