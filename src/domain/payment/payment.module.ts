import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './controller/payment.controller';
import { PaymentRepository } from './repository/payment.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, PrismaService],
})
export class PaymentModule {}
