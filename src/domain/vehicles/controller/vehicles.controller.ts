import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query
} from '@nestjs/common';
import { VehiclesService } from '../service/vehicles.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get('all')
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.vehiclesService.findAll(queryFilter);
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(updateVehicleDto, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.removeVehicle(+id);
  }
}
