import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { httpCodes } from '../constants/responseCodes';
import { jobsSeed } from '../seeds/db';
import { Jobs } from './entity';

@Injectable()
export class JobsRepository {
  constructor(@Inject('notifications-service') private readonly notificationService: ClientProxy) {}
  async saveJob(job) {
    try {
      await Jobs.save(job);
      return { status: httpCodes.created201, response: jobsSeed[jobsSeed.length - 1] };
    } catch (error) {
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }

  async connectUserService(pattern: string, data, msResponse: number) {
    const resultConnection = this.notificationService
      .send(pattern, data)
      .pipe(timeout(msResponse))
      .pipe(
        catchError((error) => {
          throw new HttpException(error, error?.response?.statusCode || 500);
        })
      )
      .toPromise();
    return resultConnection;
  }
}
