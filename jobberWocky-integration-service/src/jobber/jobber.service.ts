import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { httpCodes } from '../constants/responseCodes';
import { jobberWocky } from '../environment/config';
import { JobberWockyRepository } from './jobber.repository';
import { getUrl } from './utils/url';

@Injectable()
export class JobberWockyService {
  constructor(private readonly logger: Logger, private readonly jobberWockyRepository: JobberWockyRepository) {}
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
      const url = getUrl(name, salary_max, salary_min, country);
      const jobsFinded = await this.jobberWockyRepository.findJobsByParams(url);
      console.log({ url });
      console.log({ jobsFinded: jobsFinded.data });

      //  return { status: httpCodes.created201, data: jobsFinded };
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
