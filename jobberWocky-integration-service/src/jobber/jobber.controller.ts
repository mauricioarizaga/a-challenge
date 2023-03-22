import { Controller, Get, HttpException, HttpStatus, Inject, Logger, Query } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ApiQuery } from '@nestjs/swagger';
import { RPC } from '../constants/rpc';
import { Rpc } from '../decorators/rpc.decorator';
import { AppService } from '../nestConfig/app.service';
import { SearchJobDTO } from './dto/job.dto';
import { JobberWockyService } from './jobber.service';

@Controller('jobs')
export class JobberWockyController {
  constructor(@Inject(Logger) private readonly logger: Logger, private jobberService: JobberWockyService, private appService: AppService) {}

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
      return await this.jobberService.getJobs(name, salary_min, salary_max, country);
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

  @Rpc()
  @MessagePattern(RPC.GET_JOBS_FROM_WOCKY)
  async getJobsProxy(payload) {
    try {
      this.logger.log({
        message: 'Get Jobs Wocky Proxy Controller ',
        payload,
        error: false,
      });
      const { name, salary_min, salary_max, country } = payload;
      return await this.jobberService.getJobs(name, salary_min, salary_max, country);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
