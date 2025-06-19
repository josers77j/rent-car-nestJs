import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { Prisma } from '@prisma/client';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';

@Injectable()
export class BranchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    return await this.prisma.branch.create({
      data: createBranchDto,
      
    });
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>, state?: string, city?: string) {
  const { perPage = 10, page = 1 } = queryFilter;

  // Construir el filtro dinámico para Prisma
  const where: Prisma.BranchWhereInput = {};

  if (state) {
    where.state = {
      contains: state,
      mode: 'insensitive',
    };
  }

  if (city) {
    where.city = {
      contains: city,
      mode: 'insensitive',
    };
  }

  // Llamar al constructor de paginación
  return builderPagination(
    {
      model: this.prisma.branch,
      args: {
        where,
        select: {
          id: true,
          state: true,
          city: true,
          district: true,
          company: {
            select: {
              name: true, // Solo el nombre de la compañía
            },
          },
          createdBy: true,
          modifiedBy: true,
          deletedBy: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      },
      options: { page, perPage },
    });
  }

  async findOne(id: number) {
    return await this.prisma.branch.findUnique({
      where: { id },
      
    });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
  return await this.prisma.branch.update(
    {
      where: { id },
      data: {
        ...updateBranchDto,
        modifiedBy: updateBranchDto.modifiedBy, // Asegúrate de incluir esto
        updatedAt: new Date(), // Actualiza la fecha de modificación
      },
      
    });
  }

async delete(id: number, deletedBy: number) {
  console.log('Deleting branch with deletedBy:', deletedBy);
  return await this.prisma.branch.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      // Asegúrate de que este valor no sea undefined
    },
  });
}


}