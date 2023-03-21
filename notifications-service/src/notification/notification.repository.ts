import { HttpException, Injectable, Logger } from '@nestjs/common';
import { SubscriptionJobs } from './entity/index';
import { sendEmailGoogle } from './utils/mail';

@Injectable()
export class NotificationRepository {
  constructor(private readonly logger: Logger) {}

  async sendMail(payload): Promise<any> {
    try {
      this.logger;
      const msg = {
        from: 'marizaga@gmail.com',
        to: 'mauricioarizaga@hotmail.com',
        subject: 'Plain Text Email ✔',
        text: 'Welcome NestJS Email Sending Tutorial',
      };
      const response = await sendEmailGoogle(msg);
      return response;
    } catch (error) {
      throw new HttpException(error, error?.statusCode || 500);
    }
  }
  async saveNewsLetter(email: string) {
    try {
      const response = await SubscriptionJobs.save({ email });
      return response;
    } catch (error) {
      throw new HttpException(error, error?.statusCode || 500);
    }
  }
}
