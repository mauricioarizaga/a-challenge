import { HttpException, Injectable } from '@nestjs/common';
import { endOfDay, endOfYesterday, format, formatISO, startOfDay, startOfYesterday } from 'date-fns';
import { Between, FindManyOptions } from 'typeorm';
import { RPC } from '../constants/rpc';
import { Jobs } from './entity/Jobs';
import { NotificationRepository } from './notification.repository';
import { convertYYYYMMDDToDate } from './utils/date';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async sendMailSubscriptionNewJob(data): Promise<any> {
    try {
      return await this.notificationRepository.sendMail(data);
    } catch (error) {
      throw new HttpException(error, error?.statusCode || 500);
    }
  }
  async saveSubscriber(email: string) {
    try {
      this.getJobs();
      return await this.notificationRepository.saveNewsLetter(email);
    } catch (error) {
      throw new HttpException(error, error?.statusCode || 500);
    }
  }

  async getJobs() {
    const dateNew = format(new Date(), 'yyyyMMdd');
    const allStartDate = startOfDay(convertYYYYMMDDToDate(dateNew));
    const allEndDate = endOfDay(convertYYYYMMDDToDate(dateNew));

    const findArg: FindManyOptions<Jobs> = {
      where: {
        createdAt: Between(allStartDate, allEndDate),
      },
    };
    console.log(allEndDate, allStartDate, dateNew);
    const queryData = {
      where: {
        createdAt: Between(allStartDate, allEndDate),
      },
    };
    return await this.notificationRepository.connectUserService(RPC.GET_NEW_POST_JOB, findArg, 10000);
  }
}
