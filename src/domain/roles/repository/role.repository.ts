import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(role: Role): Promise<Role> {
    return await this.prisma.role.create({
      data: {
        name: 'nombre',
        description: 'descripcion',
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async findById(roleId: number): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });
  }
}
