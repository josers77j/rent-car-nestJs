import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: Partial<Payment>): Promise<
    Payment & { createdByUser: { name: string } | null }
  > {
    const { rentalId, amount, paymentMethod, paymentDate, createdBy } = payment;

    if (!rentalId || !amount || !paymentMethod || !paymentDate) {
      throw new Error('All required fields must be provided.');
    }

    return await this.prisma.payment.create({
      data: {
        rentalId,
        amount,
        paymentMethod,
        paymentDate,
        createdBy,
        createdAt: new Date(),
      },
      include: {
        createdByUser: { select: { name: true } },
      },
    });
  }

  async update(paymentId: number, payment: Partial<Payment>): Promise<
    Payment & { modifiedByUser: { name: string } | null }
  > {
    const { amount, paymentMethod, paymentDate, modifiedBy } = payment;

    return await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        amount,
        paymentMethod,
        paymentDate,
        modifiedBy,
        updatedAt: new Date(),
      },
      include: {
        modifiedByUser: { select: { name: true } },
      },
    });
  }

  async softDelete(paymentId: number, deletedBy: number): Promise<
    Payment & { deletedByUser: { name: string } | null }
  > {
    return await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        deletedBy,
        deletedAt: new Date(),
      },
      include: {
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async findAll(): Promise<Payment[]> {
    return await this.prisma.payment.findMany({
      where: { deletedAt: null },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
        rental: { select: { id: true, startDate: true, endDate: true } }, // Incluye datos de renta si es necesario
      },
    });
  }

  async findById(paymentId: number): Promise<Payment | null> {
    return await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
        rental: { select: { id: true, startDate: true, endDate: true } }, // Incluye datos de renta si es necesario
      },
    });
  }
}