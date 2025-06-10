import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';


 @Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

async create(role: Partial<Role>): Promise<
  Role & { createdByUser: { name: string } | null }
> {
  const { name, description, createdBy } = role;

  if (!name) {
    throw new Error('The "name" field is required.');
  }

  return await this.prisma.role.create({
    data: {
      name,
      description,
      createdBy,
      createdAt: new Date(),
    },
    include: {
      createdByUser: { select: { name: true } },
    },
  });
}


  async update(roleId: number, role: Partial<Role>): Promise<Role> {
    const { name, description, modifiedBy } = role;
    return await this.prisma.role.update({
      where: { id: roleId },
      data: {
        name,
        description,
        modifiedBy,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(roleId: number, deletedBy: number): Promise<Role> {
    return await this.prisma.role.update({
      where: { id: roleId },
      data: {
        deletedBy,
        deletedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany({
      where: { deletedAt: null }, // Excluye roles eliminados
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async findById(roleId: number): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: { id: roleId },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }
}
