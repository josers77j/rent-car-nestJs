/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
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
import { GetUser } from 'src/decorators/user-token.decorators';
import { JwtPayload } from 'src/interfaces/jwt-strategy.interface';

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
  findAll<T>(
    @Query('name') name: string,
    @Query('userId') userId: number,
    @Query() queryFilter: GenericQueryFilterDto<T>,
  ) {
    return this.usersService.findAll(queryFilter, name, +userId);
  }

  @Post()
  createUser(
    @Body() userBody: CreateUserDto, 
    @GetUser() userInformation: JwtPayload
  ) {
    const { name } = userInformation;

    return this.usersService.createUser(userBody, name);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string, 
    @Body() userBody: UpdateBasicInformationDto, 
    @GetUser() userInformation: JwtPayload) {
    
       console.log({info: userInformation});
      const { name } = userInformation;
      
    return this.usersService.updateBasicInformation(
      +id,
      userBody,
      name,
    );
    
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const authenticatedUserId = 'Yonatan'; // ID del usuario autenticado, hardcodeado para pruebas
    return this.usersService.deleteUser(+id, authenticatedUserId);
  }
}
