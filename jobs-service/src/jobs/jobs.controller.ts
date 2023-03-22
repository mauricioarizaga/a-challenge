import { Body, Controller, Get, HttpException, Inject, Logger, Post } from '@nestjs/common';
import { AppService } from '../nestConfig/app.service';
import { JobDTO } from './dto/job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(@Inject(Logger) private readonly logger: Logger, private jobsService: JobsService, private appService: AppService) {}

  @Post()
  async saveJob(@Body() job: JobDTO) {
    try {
      this.logger.log({
        message: 'Save Job Controller',
        job,
        error: false,
      });
      return await this.jobsService.saveJob(job);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
