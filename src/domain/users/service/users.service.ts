import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllFiltered<T>(queryFilter: GenericQueryFilterDto<T>) {
    try {
      return await this.userRepository.findAllFiltered(queryFilter);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching users',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
