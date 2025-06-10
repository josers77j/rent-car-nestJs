import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(permission: Partial<Permission>): Promise<
    Permission & { createdByUser: { name: string } | null }
  > {
    const { name, description, createdBy } = permission;

    if (!name) {
      throw new Error('The "name" field is required.');
    }

    return await this.prisma.permission.create({
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

  async update(permissionId: number, permission: Partial<Permission>): Promise<
    Permission & { modifiedByUser: { name: string } | null }
  > {
    const { name, description, modifiedBy } = permission;

    return await this.prisma.permission.update({
      where: { id: permissionId },
      data: {
        name,
        description,
        modifiedBy,
        updatedAt: new Date(),
      },
      include: {
        modifiedByUser: { select: { name: true } },
      },
    });
  }

  async softDelete(permissionId: number, deletedBy: number): Promise<
    Permission & { deletedByUser: { name: string } | null }
  > {
    return await this.prisma.permission.update({
      where: { id: permissionId },
      data: {
        deletedBy,
        deletedAt: new Date(),
      },
      include: {
        deletedByUser: { select: { name: true } },
      },
    });
  }

  async findAll(): Promise<Permission[]> {
  return await this.prisma.permission.findMany({
    where: { deletedAt: null },
    include: {
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
      roles: { select: { roleId: true } }, // Incluye roles si es necesario
    },
  });
}


  async findById(permissionId: number): Promise<Permission | null> {
  return await this.prisma.permission.findUnique({
    where: { id: permissionId },
    include: {
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
      roles: { select: { roleId: true } }, // Incluye roles si es necesario
    },
  });
}
}
