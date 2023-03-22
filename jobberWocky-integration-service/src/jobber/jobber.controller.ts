import { Controller, Get, HttpException, Inject, Logger, Query } from '@nestjs/common';
import { AppService } from '../nestConfig/app.service';
import { SearchJobDTO } from './dto/job.dto';
import { JobberWockyService } from './jobber.service';

@Controller('jobs')
export class JobberWockyController {
  constructor(@Inject(Logger) private readonly logger: Logger, private jobberService: JobberWockyService, private appService: AppService) {}

  @Get()
  async getJobs(@Query() query: SearchJobDTO) {
    try {
      this.logger.log({
        message: 'Get Jobs Wocky Controller',
        query,
        error: false,
      });
      const { name, salary_min, salary_max, country } = query;
      return await this.jobberService.getJobs(name, salary_min, salary_max, country);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
