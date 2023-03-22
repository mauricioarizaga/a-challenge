import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { FindManyOptions } from 'typeorm';
import { httpCodes } from '../constants/responseCodes';
import { Jobs } from './entity';

@Injectable()
export class JobsRepository {
  constructor(@Inject('notifications-service') private readonly notificationService: ClientProxy) {}
  async saveJob(job) {
    try {
      const save = await Jobs.save(job);
      return save;
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
