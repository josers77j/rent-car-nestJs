import { IsNotEmpty, IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  rentalId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod, { message: 'paymentMethod must be one of the following values: cash, credit_card, debit_card, bank_transfer, paypal' })
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  paymentDate: string;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsOptional() // Opcional durante la creación
  @IsNumber()
  modifiedBy?: number;
}
