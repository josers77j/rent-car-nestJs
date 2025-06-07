import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMaintenanceDto, MaintenanceType as DtoMaintenanceType } from '../dto/create-maintenance.dto';
import { Prisma, MaintenanceType as PrismaMaintenanceType } from '@prisma/client';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';

@Injectable()
export class MaintenanceRepository {
  constructor(private readonly prisma: PrismaService) {}

async createMaintenance(createMaintenanceDto: CreateMaintenanceDto): Promise<void> {
  const prismaData: Prisma.MaintenanceCreateInput = {
    description: createMaintenanceDto.description,
    type: this.mapMaintenanceType(createMaintenanceDto.type),
    startDate: createMaintenanceDto.startDate,
    endDate: createMaintenanceDto.endDate,
    cost: createMaintenanceDto.cost,
    vehicle: {
      connect: { id: createMaintenanceDto.vehicleId }, // Conecta el vehículo existente
    },
    createdByUser: createMaintenanceDto.createdBy
      ? {
          connect: { id: createMaintenanceDto.createdBy }, // Conecta al usuario si `createdBy` no es nulo
        }
      : undefined,
  };

  try {
    await this.prisma.maintenance.create({ data: prismaData });
  } catch (error) {
    throw new Error(`Failed to create maintenance: ${error.message}`);
  }
}

  private mapMaintenanceType(type: DtoMaintenanceType): PrismaMaintenanceType {
    switch (type) {
      case DtoMaintenanceType.PREVENTIVE:
        return PrismaMaintenanceType.routine;
      case DtoMaintenanceType.CORRECTIVE:
        return PrismaMaintenanceType.repair;
      default:
        throw new Error(`Unknown MaintenanceType: ${type}`);
    }
  }

 async findAll() {
  return await this.prisma.maintenance.findMany({
    include: {
      createdByUser: { select: { name: true } }, // Incluye el nombre del creador
      modifiedByUser: { select: { name: true } }, // Incluye el nombre del modificador (si existe)
      deletedByUser: { select: { name: true } }, // Incluye el nombre del eliminador (si existe)
    },
  });
}


  async findOne(id: number) {
    return await this.prisma.maintenance.findUnique({
      where: { id },
    });
  }

async updateMaintenance(id: number, updateMaintenanceDto: UpdateMaintenanceDto): Promise<void> {
  const { description, modifiedBy } = updateMaintenanceDto;

  // Validar existencia del usuario
  if (modifiedBy) {
    const userExists = await this.prisma.user.findUnique({ where: { id: modifiedBy } });
    if (!userExists) {
      throw new Error(`User with ID ${modifiedBy} does not exist.`);
    }
  }

  const prismaData: Prisma.MaintenanceUpdateInput = {
    description,
    modifiedByUser: modifiedBy ? { connect: { id: modifiedBy } } : undefined,
    updatedAt: new Date(), // Actualiza la fecha de modificación
  };

  try {
    await this.prisma.maintenance.update({
      where: { id },
      data: prismaData,
    });
  } catch (error) {
    throw new Error(`Failed to update maintenance record: ${error.message}`);
  }
}

async softDeleteMaintenance(id: number, deletedBy: number): Promise<void> {
  const userExists = await this.prisma.user.findUnique({ where: { id: deletedBy } });
  if (!userExists) {
    throw new Error(`User with ID ${deletedBy} does not exist.`);
  }

  const maintenance = await this.prisma.maintenance.findUnique({ where: { id } });
  if (!maintenance) {
    throw new Error(`Maintenance record with ID ${id} not found.`);
  }

  await this.prisma.maintenance.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      deletedBy,
    },
  });
}


  
}
