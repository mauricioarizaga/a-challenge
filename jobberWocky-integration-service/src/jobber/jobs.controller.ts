import { Controller, Get, HttpException, Inject, Logger, Param } from '@nestjs/common';
import { AppService } from '../nestConfig/app.service';
import { SearchJobDTO } from './dto/job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(@Inject(Logger) private readonly logger: Logger, private jobsService: JobsService, private appService: AppService) {}

  @Get()
  async getJobs(@Param() param: SearchJobDTO) {
    try {
      this.logger.log({
        message: 'Get Jobs Wocky Controller',
        param,
        error: false,
      });
      const { name, salary_min, salary_max, country } = param;
      return await this.jobsService.getJobs(name, salary_min, salary_max, country);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
