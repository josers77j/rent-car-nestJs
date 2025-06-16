import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  
 async create(createCompanyDto: CreateCompanyDto, createdBy: number) {
  const userExists = await this.prisma.user.findUnique({ where: { id: createdBy } });
  if (!userExists) {
    throw new Error('User not found');
  }

  if (!createCompanyDto.name) {
    throw new Error('Company name is required');
  }

  return this.prisma.company.create({
    data: {
      ...createCompanyDto,
      createdBy,
    },
    include: {
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
    },
  });
}


  async findAll() {
    return this.prisma.company.findMany({
      where: { deletedAt: null },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
 
     },
    });
  }

  async findOne(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, modifiedBy: number) {
    return this.prisma.company.update({
      where: { id },
      data: {
        ...updateCompanyDto,
        modifiedBy,
        updatedAt: new Date(),
      },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async delete(id: number, deletedBy: number) {
    return this.prisma.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }
}
