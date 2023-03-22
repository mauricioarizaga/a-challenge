import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { Jobs } from './entity';

@Injectable()
export class JobsRepository {
  constructor(@Inject('jobberWocky-integration-service') private readonly jobberService: ClientProxy) {}
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
  async findJobs(queryData) {
    try {
      return await Jobs.find(queryData);
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
  async connectJobberService(pattern: string, data, msResponse: number) {
    const resultConnection = this.jobberService
      .send(pattern, data)
      .pipe(timeout(msResponse))
      .pipe(
        catchError((error) => {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: error,
            },
            HttpStatus.BAD_REQUEST
          );
        })
      )
      .toPromise();
    return resultConnection;
  }
}
