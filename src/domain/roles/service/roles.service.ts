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
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    try {
      return await this.roleRepository.findAll();
    } catch (error) {
      Logger.error(error);
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrio un error al obtener el rol',
      );
    }
  }

  async findById(roleId: number) {
    try {
      return await this.roleRepository.findById(roleId);
    } catch (error) {
      Logger.error(error);
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrio un error al obtener el rol',
      );
    }
  }
}
