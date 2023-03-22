import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { httpCodes } from '../constants/responseCodes';
import { Jobs } from '../entity/Jobs';

@Injectable()
export class JobsRepository {
  constructor() {}
  async findJob(findArgs: FindManyOptions<Jobs>) {
    try {
      return await Jobs.find(findArgs);
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
}
