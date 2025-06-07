import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

import {
  CreateVehicleDto,
} from '../dto/create-vehicle.dto';
import { Prisma } from '@prisma/client';

import { Vehicle } from '@prisma/client';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { GenericQueryFilterDto } from "src/domain/Dto/generic-query-filter.dto";

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
  const { brand, model, year, plateNumber, type, status, dailyRate, createdBy } = createVehicleDto;
  return await this.prisma.vehicle.create({
    data: {
      brand,
      model,
      year,
      plateNumber,
      type,
      status,
      dailyRate,
      createdBy, // Asigna el valor recibido
    },
  });
}


  async updateVehicle(vehicleId: number, updateVehicleDto: UpdateVehicleDto) {
  const { brand, model, year, plateNumber, type, status, dailyRate, modifiedBy } = updateVehicleDto; // Incluye modifiedBy
  return await this.prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      brand,
      model,
      year,
      plateNumber,
      type,
      status,
      dailyRate,
      modifiedBy, 
    },
  });
}


async removeVehicle(vehicleId: number, deletedBy: number) {
  return await this.prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      deletedBy, // Registra el usuario que eliminó
      deletedAt: new Date(), // Registra la fecha de eliminación
      
    },
  });
}


async findAll(queryFilter: GenericQueryFilterDto<Vehicle>): Promise<any> {
  const vehicles = await this.prisma.vehicle.findMany({
    where: {
      ...queryFilter.filters,
      // Si quieres incluir todos los registros (eliminados o no), elimina este filtro.
      // El filtro puede depender de un parámetro opcional en `queryFilter` si deseas más control.
    },
    include: {
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
    },
  });

  return vehicles;
}

}




