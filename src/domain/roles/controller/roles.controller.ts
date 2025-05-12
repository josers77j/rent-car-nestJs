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

@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('all')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('/:roleId')
  findById(@Param('roleId') roleId: number) {
    console.log('roleId', roleId);
    return this.rolesService.findById(+roleId);
  }
}
