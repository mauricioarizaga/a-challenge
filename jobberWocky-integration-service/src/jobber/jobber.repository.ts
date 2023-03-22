import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JobberWockyRepository {
  constructor(private readonly axiosRequest: HttpService) {}

  async findJobsByParams(url: string) {
    try {
      const response = await firstValueFrom(this.axiosRequest.get(url));
      return response;
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
}
