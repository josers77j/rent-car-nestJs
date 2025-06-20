import { Module } from '@nestjs/common';
import { VehiclesController } from './controller/vehicles.controller';
import { VehiclesService } from './service/vehicles.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { VehicleRepository } from './repository/vehicles.repository';

@Module({
  imports: [UsersModule],
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService, VehicleRepository],
  exports: [VehiclesService],
})
export class VehiclesModule {}
