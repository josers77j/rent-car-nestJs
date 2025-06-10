import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

import { PaymentRepository } from '../repository/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { rentalId, amount, paymentMethod, paymentDate, createdBy } = createPaymentDto;
    const payment = await this.paymentRepository.create({
      rentalId,
      amount,
      paymentMethod,
      paymentDate: new Date(paymentDate),
      createdBy,
    });
    return payment;
  }

  async findAll() {
    return await this.paymentRepository.findAll();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const { amount, paymentMethod, paymentDate, modifiedBy } = updatePaymentDto;
    const payment = await this.paymentRepository.update(id, {
      amount,
      paymentMethod,
      paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      modifiedBy,
    });
    return payment;
  }

  async remove(id: number) {
    const deletedBy = 1; // Reemplaza con el ID del usuario actual si lo tienes disponible
    return await this.paymentRepository.softDelete(id, deletedBy);
  }
}
