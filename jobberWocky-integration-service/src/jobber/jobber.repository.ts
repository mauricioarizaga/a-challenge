import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class JobberWockyRepository {
  constructor(private readonly axiosRequest: HttpService) {}

  async findJobsByParams(url: string) {
    try {
      const response = await lastValueFrom(this.axiosRequest.get(url));
      return response;
    } catch (error) {
      console.log(error?.response?.data);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
