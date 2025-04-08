import { IsISO8601, IsNumber, IsObject, IsOptional } from 'class-validator';

export class GenericQueryFilterDto<T> {
  @IsOptional()
  @IsISO8601()
  to: string;

  @IsOptional()
  @IsISO8601()
  from: string;

  @IsOptional()
  @IsObject()
  filters: T[];

  @IsOptional()
  @IsNumber()
  perPage: number = 10;

  @IsOptional()
  @IsNumber()
  page: number = 1;
}
