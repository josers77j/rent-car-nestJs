import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class FiltersDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;
}

export class GenericQueryFilterDto<T> {
  @IsOptional()
  @IsISO8601()
  to: string;

  @IsOptional()
  @IsISO8601()
  from: string;

  @IsOptional()
  @IsNumber()
  perPage: number = 10;

  @IsOptional()
  @IsNumber()
  page: number = 1;

   @IsOptional()
  filters?: Partial<T>;
  
}
