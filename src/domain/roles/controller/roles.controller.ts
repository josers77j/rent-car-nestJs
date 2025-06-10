import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from '../service/roles.service';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

//@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('all')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('/:roleId')
  findById(@Param('roleId') roleId: number) {
    return this.rolesService.findById(+roleId);
  }

  @Post()
async create(@Body() createRoleDto: CreateRoleDto) {
  const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
  return await this.rolesService.create(createRoleDto, authenticatedUserId);
}


  @Patch(':roleId')
  update(
    @Param('roleId') roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
    return this.rolesService.update(roleId, updateRoleDto, authenticatedUserId);
  }

  @Delete(':roleId')
  softDelete(@Param('roleId') roleId: number) {
    const authenticatedUserId = 1; // ID del usuario autenticado, hardcodeado para pruebas
    return this.rolesService.softDelete(roleId, authenticatedUserId);
  }
}

