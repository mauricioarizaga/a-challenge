import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsNumber, Min, IsString } from 'class-validator';
export class JobDTO {
  @ApiProperty({ default: 'Sr NodeJs Developer' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 1000 })
  @IsNumber()
  @Min(0)
  salary: number;

  @ApiProperty({ default: 'Argentina' })
  @IsString()
  country: string;

  @ApiProperty({ default: ['POO'] })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  skills: string[];
}
