import { Module } from '@nestjs/common';
import { RentalService } from './service/rental.service';
import { RentalController } from './controller/rental.controller';
import { PrismaService } from 'prisma/prisma.service';
import { RentalRepository } from './repository/rental.repository';

@Module({
  controllers: [RentalController],
  providers: [RentalService, PrismaService,RentalRepository],
})
export class RentalModule {}
