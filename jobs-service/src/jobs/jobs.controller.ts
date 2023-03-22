import { Body, Controller, Get, HttpException, HttpStatus, Inject, Logger, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from '../nestConfig/app.service';
import { JobDTO, SearchJobDTO } from './dto/job.dto';
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
  @Get()
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'salary_min', type: Number, required: false })
  @ApiQuery({ name: 'country', type: String, required: false })
  @ApiQuery({ name: 'salary_max', type: Number, required: false })
  async getJobs(@Query() query: SearchJobDTO) {
    try {
      this.logger.log({
        message: 'Get Jobs Wocky Controller',
        query,
        error: false,
      });
      const { name, salary_min, salary_max, country } = query;
      return await this.jobsService.findJobs(name, salary_min, salary_max, country);
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

  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
