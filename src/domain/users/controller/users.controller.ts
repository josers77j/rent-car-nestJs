import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import {
  CreateUserDto,
  passwordUserDto,
  UpdateBasicInformationDto,
} from '../dto/create-user.dto';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

//@UseGuards(AuthGuard)
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
  findAll<T>(
    @Query('name') name: string,
    @Query('userId') userId: number,
    @Query() queryFilter: GenericQueryFilterDto<T>,
  ) {
    return this.usersService.findAll(queryFilter, name, +userId);
  }

@Post()
  createUser(@Body() user: CreateUserDto) {
    const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
    return this.usersService.createUser(user, authenticatedUserId);
  }
   @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: UpdateBasicInformationDto,
  ) {
    const userId = parseInt(id, 10);
    const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
    return this.usersService.updateBasicInformation(userId, user, authenticatedUserId);
  }

  @Delete(':id')
deleteUser(@Param('id') id: string) {
  const userId = parseInt(id, 10);
  const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
  return this.usersService.deleteUser(userId, authenticatedUserId);
}
}