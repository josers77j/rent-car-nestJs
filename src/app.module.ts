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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RolesModule,
    ClientsModule,
    VehiclesModule,
     MaintenanceModule, // Agregado
    RentalModule, PermissionModule, PaymentModule, // Agregado
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
