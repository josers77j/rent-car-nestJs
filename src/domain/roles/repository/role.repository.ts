import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';


 @Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

async createRole(createRoleDto: CreateRoleDto, username: string) {
  const { name, description } = createRoleDto;
  return await this.prisma.role.create({
    data: {
      name,
      description,
      createdBy: username,
      modifiedBy: username,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}




  async update(roleId: number, role: Partial<Role>, username: string): Promise<Role> {
  const { name, description } = role;
  return await this.prisma.role.update({
    where: { id: roleId },
    data: {
      name,
      description,
      modifiedBy: username, // Guardas el nombre aquí
      updatedAt: new Date(),
    },
  });
}



  async softDelete(roleId: number, deletedBy: number): Promise<Role> {
    return await this.prisma.role.update({
      where: { id: roleId },
      data: {
        
        deletedAt: new Date(),
      },
    });
  }

  
  async findAll(): Promise<Role[]> {
  return await this.prisma.role.findMany({
    where: { deletedAt: null }, // Excluye roles eliminados
    
  });
}



  async findById(roleId: number): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: { id: roleId },
      include: {
      
      },
    });
  }

  
}
