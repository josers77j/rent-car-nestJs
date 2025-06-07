import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import {
  CreateUserDto,
  passwordUserDto,
  UpdateBasicInformationDto,
} from '../dto/create-user.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { Prisma } from '@prisma/client';
import { builderPagination } from 'src/helpers/pagination-builder.helpers';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByUserEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, roleId, password } = createUserDto;
    console.log('createUserDto', createUserDto);
    return await this.prisma.user.create({
      data: {
        name,
        email,
        roleId,
        password,
        createdAt: new Date(),
      },
    });
  }

  async updatePassword(passwordUserDto: passwordUserDto, userId: number) {
    const { password } = passwordUserDto;
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  async updateBasicInformation(
    userId: number,
    user: UpdateBasicInformationDto,
  ) {
    const { name, roleId, email } = user;
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        roleId,
        email,
      },
    });
  }

  findAll<T>(queryFilter: GenericQueryFilterDto<T>, name: string, userId: number) {
    const { perPage, page } = queryFilter;

    const where: Prisma.UserWhereInput = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (userId) {
      where.id = {
        equals: userId,
      };
    }

    return builderPagination({
      model: this.prisma.user,
      args: {
        where,
        include: {
          role: true,
        },
      },
      options: {
        page,
        perPage,
      },
    });
  }
  async findNameById(userId: number): Promise<string | null> {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  return user?.name || null;
}

}
