import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto, passwordUserDto } from '../dto/create-user.dto';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('password/:id')
  updatePassword(
    @Body() passwordUserDto: passwordUserDto,
    @Param('id') id: number,
  ) {
    return this.usersService.updatePassword(passwordUserDto, id);
  }

  @Get('all')
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.usersService.findAll(queryFilter);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
