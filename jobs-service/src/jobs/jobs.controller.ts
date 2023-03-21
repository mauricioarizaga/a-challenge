import { Body, Controller, Get, HttpException, Inject, Logger, Post } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPC } from '../constants/rpc';
import { Rpc } from '../decorators/rpc.decorator';
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
  @Rpc()
  @MessagePattern(RPC.GET_NEW_POST_JOB)
  async getNewJob(payload): Promise<any> {
    try {
      console.log({ payload, pay: payload.where });
      return await this.jobsService.getJobs(payload);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Get('health')
  getHealth() {
    return this.appService.healthCheck();
  }
}
