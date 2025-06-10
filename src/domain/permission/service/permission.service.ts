import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  // Método para transformar una entidad Permission
  private transformPermission(permission: any) {
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      createdBy: permission.createdByUser?.name || null,
      modifiedBy: permission.modifiedByUser?.name || null,
      deletedBy: permission.deletedByUser?.name || null,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      deletedAt: permission.deletedAt,
    };
  }

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = await this.permissionRepository.create({
        ...createPermissionDto,
        createdBy: 1, // Cambia a ID dinámico si tienes autenticación implementada
      });
      return this.transformPermission(permission);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al crear el permiso');
    }
  }

  async findAll() {
    try {
      const permissions = await this.permissionRepository.findAll();
      return permissions.map((permission) => this.transformPermission(permission));
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al obtener los permisos');
    }
  }

  async findOne(id: number) {
    try {
      const permission = await this.permissionRepository.findById(id);
      if (!permission) {
        throw new InternalServerErrorException('Permiso no encontrado');
      }
      return this.transformPermission(permission);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al obtener el permiso');
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.update(id, {
        ...updatePermissionDto,
        modifiedBy: 1, // Cambia a ID dinámico si tienes autenticación implementada
      });
      return this.transformPermission(permission);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al actualizar el permiso');
    }
  }

  async remove(id: number) {
    try {
      const permission = await this.permissionRepository.softDelete(id, 1); // Cambia a ID dinámico
      return this.transformPermission(permission);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al eliminar el permiso');
    }
  }
}
