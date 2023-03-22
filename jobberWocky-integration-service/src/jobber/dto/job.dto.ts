import { ApiQuery } from '@nestjs/swagger';

export class SearchJobDTO {
  name: string;
  salary_min: number;
  salary_max: number;
  country: string;
}
