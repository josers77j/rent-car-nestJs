import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.usersService.findAllFiltered(queryFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
