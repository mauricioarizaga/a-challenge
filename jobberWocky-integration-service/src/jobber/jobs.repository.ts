import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class JobsRepository {
  constructor() {}
  async findJobsByParams(name, salary_max, salary_min, country) {
    try {
      const url = '';
      const response = await axios.get();
      return response.data;
    } catch (error) {
      throw new HttpException(error, error?.statusCode || httpCodes.error500);
    }
  }
}
