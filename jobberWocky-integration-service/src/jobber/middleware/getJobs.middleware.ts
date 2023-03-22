import { Request, Response, NextFunction } from 'express';
import { BadRequestException, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { SearchJobDTO } from '../dto/job.dto';

@Injectable()
export class getJobsMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      /*  const body = new JobDTO();
      const { name, salary, country, skills } = req.body;
      body.name = name;
      body.salary = salary;
      body.country = country;
      body.skills = skills;
      const errors = await validate(body);
      if (errors.length > 0) throw new BadRequestException(errors);
      */ next();
    } catch (error) {
      throw new HttpException(error?.response?.message, error?.response?.statusCode || 500);
    }
  }
}
