/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

import {
  CreateUserDto,
  passwordUserDto,
  UpdateBasicInformationDto,
} from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // Obtener el nombre del usuario autenticado
  async getAuthenticatedUserName(userId: number): Promise<string> {
    try {
      const userName = await this.userRepository.findNameById(userId);
      if (!userName) {
        throw new UnauthorizedException(
          'Usuario no autenticado o no encontrado',
        );
      }
      return userName;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'Error al obtener el nombre del usuario autenticado',
      );
    }
  }

  async findOneByUserEmail(email: string) {
    try {
      const process = await this.userRepository.findOneByUserEmail(email);
      if (!process)
        throw new UnauthorizedException(
          'Usuario o contraseña invalidos, intente de nuevo',
        );
      return process;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async createUser(createUserDto: CreateUserDto, username: string) {
    try {
      let password = process.env.USER_SECRET_PASSWORD || 'rentcarpassword';
      const saltRounds = 12;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      password = hashedPassword;

      const createProcess = await this.userRepository.createUser({
        ...createUserDto,
        password,
      }, username);
      if (!createProcess)
        throw new UnprocessableEntityException(
          'Ocurrio un error al crear el usuario',
        );

      return createProcess;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updatePassword(passwordUserDto: passwordUserDto, id: number) {
    try {
      const { password } = passwordUserDto;
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      passwordUserDto.password = hashedPassword;

      const process = await this.userRepository.updatePassword(
        passwordUserDto,
        id,
      );
      if (!process)
        throw new UnprocessableEntityException(
          'Ocurrio un error al actualizar la contraseña',
        );

      return { message: 'contraseña actualizada exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;

      throw new InternalServerErrorException(
        'Error al actualizar la contraseña',
      );
    }
  }

  async findAll<T>(
    queryFilter: GenericQueryFilterDto<T>,
    name: string,
    userId: number,
  ) {
    const { data, meta } = await this.userRepository.findAll(
      queryFilter,
      name,
      userId,
    );

    const usersMapped = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      createdby: user.createdBy,
      modifyBy: user.modifiedBy,
      updatedAt: user.updatedAt,
      role: user['role']?.name ?? null,
      createdBy: user.createdBy ?? null, 
      modifiedBy: user.modifiedBy ?? null,
      deletedBy: user.deletedBy,
      deletedAt: user.deletedAt ?? null,
    }));

    return {
      data: usersMapped,
      meta: {
        total: meta.total,
        lastpage: meta.lastPage,
        page: meta.currentPage,
        prev: meta.prev,
        next: meta.next,
        perPage: queryFilter.perPage,
      },
    };
  }

  async deleteUser(userId: number, authenticatedUserId: string) {
    try {
      const userDeleted = await this.userRepository.deleteUser(
        userId,
        authenticatedUserId,
      );

      if (!userDeleted)
        throw new UnprocessableEntityException(
          'No se pudo eliminar el usuario.',
        );

      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      Logger.error(error);
      if (error instanceof UnprocessableEntityException) throw error;

      throw new InternalServerErrorException('Error al eliminar el usuario.');
    }
  }

  async updateBasicInformation(
    id: number,
    userBody: UpdateBasicInformationDto,
    username: string,
  ) {
    try {
      const userUpdated = await this.userRepository.updateBasicInformation(
        id,
        userBody,
        username,
      );

      if (!userUpdated)
        throw new UnprocessableEntityException(
          'Ocurrio un error al actualizar la información basica del usuario',
        );

      return userUpdated;
    } catch (error) {
      Logger.error(error);
      if (error instanceof UnprocessableEntityException) throw error;

      throw new InternalServerErrorException(
        'Error al actualizar la información basica del usuario',
      );
    }
  }
}
