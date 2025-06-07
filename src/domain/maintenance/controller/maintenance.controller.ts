import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { Request } from 'express';
import { MaintenanceService } from '../service/maintenance.service';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(+id, updateMaintenanceDto);
  }

  @Delete(':id')
async remove(@Param('id') id: string, @Req() req: any) {
  req.user = { id: 1 }; 
  const deletedBy = req.user.id;
  return this.maintenanceService.softDelete(+id, deletedBy);
}


}
