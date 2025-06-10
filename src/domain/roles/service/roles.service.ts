import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  // Método para transformar un rol
  private transformRole(role: any) {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      createdBy: role.createdByUser?.name || null,
      modifiedBy: role.modifiedByUser?.name || null,
      deletedBy: role.deletedByUser?.name || null,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      deletedAt: role.deletedAt,
    };
  }

  async create(createRoleDto: CreateRoleDto, authenticatedUserId: number) {
    const role = await this.roleRepository.create({
      ...createRoleDto,
      createdBy: authenticatedUserId,
    });
    return this.transformRole(role);
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto, authenticatedUserId: number) {
    try {
      const role = await this.roleRepository.update(roleId, {
        ...updateRoleDto,
        modifiedBy: authenticatedUserId,
      });
      return this.transformRole(role); // Transformación aquí
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  async softDelete(roleId: number, authenticatedUserId: number) {
    try {
      const role = await this.roleRepository.softDelete(roleId, authenticatedUserId);
      return this.transformRole(role); // Transformación aquí
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al eliminar el rol');
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.findAll();
      return roles.map(this.transformRole); // Transformación para cada rol
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al obtener los roles');
    }
  }

  async findById(roleId: number) {
    try {
      const role = await this.roleRepository.findById(roleId);
      return this.transformRole(role); // Transformación aquí
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error al obtener el rol');
    }
  }
}
