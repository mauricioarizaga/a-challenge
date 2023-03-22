import { Inject, Logger, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { cronTimes } from '../environment/config';

@Injectable()
export class CronService {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Cron(cronTimes.startJob)
  async sendMailNewJobs(data) {
    try {
      this.logger.log({ value: { message: 'Emails Sent', error: false } });
      //   const messages = await this.eventService.subscribeEvent();
      //   const result = await this.redisRepository.getData(messages.message);

      //  console.log({ messages, result });
      return;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
