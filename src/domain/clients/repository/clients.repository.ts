import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { Prisma } from '@prisma/client';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const { name, email, phone, identification, identificationType, createdBy } = createClientDto;
    return this.prisma.customer.create({
      data: {
        name,
        email,
        phone,
        identification,
        identificationType,
        createdBy,
      },
    });
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>, name: string) {
    const { perPage = 10, page = 1 } = queryFilter;

    const where: Prisma.CustomerWhereInput = {};
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    return builderPagination({
      model: this.prisma.customer,
      args: {
        where,
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          address: true,
          identification: true,
          identificationType: true,
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
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.prisma.customer.update({
      where: { id },
      data: { ...updateClientDto, updatedAt: new Date() },
    });
  }

  async softDelete(id: number, deletedBy: number) {
    return this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy.toString() },
    });
  }
}
