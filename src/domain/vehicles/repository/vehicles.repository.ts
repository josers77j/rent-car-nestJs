import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

import {
  CreateVehicleDto,
} from '../dto/create-vehicle.dto';
import { Prisma } from '@prisma/client';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { GenericQueryFilterDto } from "src/domain/Dto/generic-query-filter.dto";

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const { brand, model, year, plateNumber, type, status, dailyRate } = createVehicleDto;
    console.log('createVehicleDto', createVehicleDto);
    return await this.prisma.vehicle.create({
      data: {
        brand,
        model,
        year,
        plateNumber,
        type,
        status,
        dailyRate
      }
    });
  }

  async updateVehicle(vehicleId: number, updateVehicleDto: UpdateVehicleDto) {
    const { brand, model, year, plateNumber, type, status, dailyRate } = updateVehicleDto;
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
      },
    });
  }

  async removeVehicle(vehicleId: number) {
    return await this.prisma.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });
  }

  findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    const { perPage, page } = queryFilter;
    const where: Prisma.VehicleWhereInput = {};

    return builderPagination({
      model: this.prisma.vehicle,
      args: {
        where,
      },
      options: {
        page,
        perPage,
      },
    });
  }
}