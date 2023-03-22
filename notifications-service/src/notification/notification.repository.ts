import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Jobs, SubscriptionJobs } from '../entity/index';
import { mailerSetup } from '../environment/config';
import { subscriptionEmailNewPost } from './templates/subscriptionNewPosts';
import { sendEmailGoogle } from './utils/mail';

@Injectable()
export class NotificationRepository {
  constructor() {}

  async sendMail(email, jobs: Jobs[]) {
    try {
      const msg = {
        from: mailerSetup.auth.user,
        to: email,
        subject: 'Look at the new jobs posts',
        html: subscriptionEmailNewPost(jobs),
      };
      const response = await sendEmailGoogle(msg);
      return response;
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

  async saveNewsLetter(email: string) {
    try {
      const response = await SubscriptionJobs.save({ email });
      return response;
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

  async getEmails(queryData) {
    try {
      return await SubscriptionJobs.find(queryData);
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
