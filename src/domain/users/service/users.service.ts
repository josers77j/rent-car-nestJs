import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

import { CreateUserDto, passwordUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async createUser(createUserDto: CreateUserDto) {
    try {
      let password = process.env.USER_SECRET_PASSWORD || 'rentcarpassword';
      const saltRounds = 12;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      password = hashedPassword;

      const createProcess = await this.userRepository.createUser({
        ...createUserDto,
        password,
      });
      if (!createProcess)
        throw new UnprocessableEntityException(
          'Ocurrio un error al crear el usuario',
        );

      return { message: 'usuario creado exitosamente' };
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

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    try {
      return await this.userRepository.findAll(queryFilter);
    } catch (error) {
      Logger.error(error);

      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }
}
