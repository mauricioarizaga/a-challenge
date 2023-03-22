import { HttpException, Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs/jobs.repository';
import { NotificationRepository } from './notification.repository';

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
      return await this.notificationRepository.saveNewsLetter(email);
    } catch (error) {
      throw new HttpException(error, error?.statusCode || 500);
    }
  }
}
