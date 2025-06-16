import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/role.repository';
import bcrypt from 'bcryptjs/umd/types';
import { UserRepository } from 'src/domain/users/repository/user.repository';
import { UpdateBasicInformationDto } from 'src/domain/users/dto/create-user.dto';

@Injectable()
export class RolesService {
  updateBasicInformation(arg0: number, userBody: UpdateBasicInformationDto, name: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository, 
  ) {}

private transformRole(role: any) {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    createdBy: role.createdBy || null,
    modifiedBy: role.modifiedBy || null,
    deletedBy: role.deletedBy || null,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    deletedAt: role.deletedAt,
  };
}

 async createRole(createRoleDto: CreateRoleDto, username: string) {
    try {
      const createProcess = await this.roleRepository.createRole(createRoleDto, username);
      if (!createProcess) {
        throw new UnprocessableEntityException('Ocurrió un error al crear el rol');
      }
      return createProcess;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException('Error al crear el rol');
    }
 
  }
   
async update(roleId: number, updateRoleDto: UpdateRoleDto, username: string) {
  try {
    
    // Actualizar el rol con el nombre del usuario
    const role = await this.roleRepository.update(roleId, updateRoleDto, username);

    return this.transformRole(role);
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
