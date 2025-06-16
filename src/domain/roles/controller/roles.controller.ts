import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { RolesService } from '../service/roles.service';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { GetUser } from 'src/decorators/user-token.decorators';

import { UpdateBasicInformationDto } from 'src/domain/users/dto/create-user.dto';
import { JwtPayload } from 'src/interfaces/jwt-strategy.interface';

@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
@Get('all')
async findAll(@Query() query: { page?: number; perPage?: number }) {
  const { page = 1, perPage = 10 } = query;
  const roles = await this.rolesService.findAll();
  const total = roles.length;

  return {
    data: roles.slice((page - 1) * perPage, page * perPage),
    meta: { total, page, perPage, lastPage: Math.ceil(total / perPage) },
  };
}


  @Get('/:roleId')
  findById(@Param('roleId') roleId: number) {
    return this.rolesService.findById(+roleId);
  }

  
  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @GetUser() userInformation: JwtPayload,
  ) {
  const { name } = userInformation;
    // Llama al servicio para crear el rol
    return await this.rolesService.createRole(createRoleDto,name);
  }
 

  @Patch(':id')
   updateUser(
     @Param('id') id: string, 
     @Body() userBody: CreateRoleDto, 
     @GetUser() userInformation: JwtPayload) {
     
       const { name } = userInformation;
       
     return this.rolesService.update(
       +id,
       userBody,
       name,
     );
     
   }
  @Delete(':roleId')
  softDelete(@Param('roleId') roleId: number) {
    const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
    return this.rolesService.softDelete(roleId, authenticatedUserId);
  }
}

