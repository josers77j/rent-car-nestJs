import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  Req, 
  UseGuards 
} from '@nestjs/common';
import { VehiclesService } from '../service/vehicles.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '@prisma/client';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get()
  async findAll(@Query() queryFilter: GenericQueryFilterDto<Vehicle>) {
    return this.vehiclesService.findAll(queryFilter);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(updateVehicleDto, +id);
  }

 @Delete(':id')
async remove(@Param('id') id: string) {
  const deletedBy = 1; // Cambia esto por el ID del usuario predeterminado o el origen donde obtienes el usuario.
  return this.vehiclesService.removeVehicle(+id, deletedBy);
}


}
