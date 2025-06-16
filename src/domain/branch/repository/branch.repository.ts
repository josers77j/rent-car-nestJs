import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';

@Injectable()
export class BranchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    return await this.prisma.branch.create({
      data: createBranchDto,
      include: {
        company: true,
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async findAll() {
    return await this.prisma.branch.findMany({
      include: {
        company: true,
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.branch.findUnique({
      where: { id },
      include: {
        company: true,
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

 async update(id: number, updateBranchDto: UpdateBranchDto) {
  return await this.prisma.branch.update({
    where: { id },
    data: {
      ...updateBranchDto,
      modifiedBy: updateBranchDto.modifiedBy, // Asegúrate de incluir esto
      updatedAt: new Date(), // Actualiza la fecha de modificación
    },
    include: {
      company: true,
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
    },
  });
}

async delete(id: number, deletedBy: number) {
  console.log('Deleting branch with deletedBy:', deletedBy);
  return await this.prisma.branch.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      deletedBy, // Asegúrate de que este valor no sea undefined
    },
    include: {
      company: true,
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
    },
  });
}


}
