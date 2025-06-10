import { Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './controller/permission.controller';
import { PermissionRepository } from './repository/permission.repository';
import { PrismaService } from 'prisma/prisma.service'; // Asegúrate de que la ruta sea correcta

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService], // Incluye el repositorio y Prisma
})
export class PermissionModule {}
