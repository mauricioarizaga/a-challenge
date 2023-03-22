import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { httpCodes } from '../constants/responseCodes';
import { Jobs } from '../entity/Jobs';

@Injectable()
export class JobsRepository {
  constructor() {}
  async findJob(findArgs: FindManyOptions<Jobs>) {
    try {
      console.log({ query: findArgs });
      return await Jobs.find(findArgs);
    } catch (error) {
      console.log({ error });
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
}
