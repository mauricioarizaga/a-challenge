import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { httpCodes } from '../constants/responseCodes';
import { RPC } from '../constants/rpc';
import { JobDTO } from './dto/job.dto';
import { JobsRepository } from './jobs.repository';
import { queryDataBuilder } from './utils/queryBuilder';

@Injectable()
export class JobsService {
  constructor(private readonly logger: Logger, private readonly jobsRepository: JobsRepository) {}
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async findJobs(name: string, salary_min: number, salary_max: number, country: string) {
    try {
      this.logger.log({
        message: 'Get Job Service',
        name,
        salary_max,
        salary_min,
        country,
        error: false,
      });
      const queryData = queryDataBuilder(name, salary_max, salary_min, country);
      const jobsFinded = await this.jobsRepository.findJobs(queryData);
      const payloadJobber = {
        name,
        salary_max,
        salary_min,
        country,
      };
      let resultJobs;
      if (jobsFinded.length > 0) {
        resultJobs = jobsFinded.map((job) => {
          const { name, salary, country, skills } = job;
          return { name, salary, country, skills };
        });
      }

      const jobsJobber = await this.searchJobber(payloadJobber);
      console.log({ jobsJobber: jobsJobber.data });
      if (jobsJobber.data.length > 0) {
        resultJobs = [...jobsJobber.data];
      }
      if (resultJobs) return { status: httpCodes.ok200, data: resultJobs };
      return { status: httpCodes.notFound404, data: [] };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async searchJobber(payloadJobber) {
    try {
      return await this.jobsRepository.connectJobberService(RPC.GET_JOBS_FROM_WOCKY, payloadJobber, 10000);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
