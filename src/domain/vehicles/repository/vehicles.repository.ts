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
import { query } from "winston";

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
      createdBy,
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


async removeVehicle(vehicleId: number, deletedBy: string) {
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


async findAll<T>(queryFilter: GenericQueryFilterDto<T>): Promise<any> {
  const {page, perPage} = queryFilter;
    const where: Prisma.VehicleWhereInput = {};

    return builderPagination({
      model: this.prisma.vehicle,
      args: {
        where,
        include: {
          company: { select: { name: true } },
        },
      },
      options: {
        page,
        perPage,
      },
    });
}

}




