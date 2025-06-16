import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  identification: string;

  @IsEnum(['dni', 'passport', 'driver_license'])
  identificationType: 'dni' | 'passport' | 'driver_license';

  @IsOptional()
  @IsInt()
  createdBy?: string;

  @IsOptional()
  @IsInt()
  modifiedBy?: string; 
}
