import { IsInt, IsString, IsDateString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
}

export class CreateMaintenanceDto {
  @IsInt()
  vehicleId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(MaintenanceType)
  type: MaintenanceType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  cost: number;

  @IsOptional()
  @IsInt()
  createdBy?: number;

  @IsOptional()
  @IsInt()
  modifiedBy?: number;

}