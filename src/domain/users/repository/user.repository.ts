import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFiltered<T>(queryFilter: GenericQueryFilterDto<T>) {
    const where: Prisma.UserWhereInput = {};
    const { page, perPage } = queryFilter;
    return builderPagination({
      model: this.prisma.user,
      args: { where },
      options: {
        page,
        perPage,
      },
    });
  }
}
