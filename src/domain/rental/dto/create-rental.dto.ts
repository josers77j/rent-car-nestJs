import { IsInt, IsDateString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { RentalStatus, PaymentStatus } from '@prisma/client';

export class CreateRentalDto {
  @IsInt()
  customerId: number;

  @IsInt()
  vehicleId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalPrice: number;

  @IsEnum(RentalStatus)
  status: RentalStatus;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsOptional()
  @IsInt()
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  modifiedBy?: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}
