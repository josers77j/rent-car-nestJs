import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { RolesModule } from './domain/roles/roles.module';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsModule } from './domain/clients/clients.module';
import { VehiclesModule } from './domain/vehicles/vehicles.module';
import { MaintenanceModule } from './domain/maintenance/maintenance.module';
import { RentalModule } from './domain/rental/rental.module';
import { PermissionModule } from './domain/permission/permission.module';
import { PaymentModule } from './domain/payment/payment.module';
import { CompanyModule } from './domain/company/company.module';
import { BranchModule } from './domain/branch/branch.module';
import { ClaudinaryModule } from './domain/claudinary/claudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RolesModule,
    ClientsModule,
    VehiclesModule,
     MaintenanceModule,
    RentalModule, PermissionModule, PaymentModule,CompanyModule,BranchModule,ClaudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
