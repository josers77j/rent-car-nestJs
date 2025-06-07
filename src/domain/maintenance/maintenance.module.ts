import { Module } from '@nestjs/common';
import { MaintenanceController } from './controller/maintenance.controller';
import { MaintenanceService } from './service/maintenance.service';
import { MaintenanceRepository } from './repository/maintenance.repository';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [UsersModule], 
  controllers: [MaintenanceController],
  providers: [MaintenanceService, MaintenanceRepository, PrismaService],
})
export class MaintenanceModule {}
