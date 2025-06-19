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

import { GetUser } from 'src/decorators/user-token.decorators';
import { JwtPayload } from 'src/interfaces/jwt-strategy.interface';

//@UseGuards(AuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto, 
  @GetUser() userInformation: JwtPayload) {
    const { name } = userInformation;
    return this.vehiclesService.createVehicle(createVehicleDto, name);
  }

  @Get()
  async findAll(@Query() queryFilter: GenericQueryFilterDto<Vehicle>) {
    return this.vehiclesService.findAll(queryFilter);
  }

  @Patch(':id')
  update(@Param('id') id: number,
  @Body() updateVehicleDto: UpdateVehicleDto,
  @GetUser() userInformation: JwtPayload) {
    const {name} = userInformation;
    
    return this.vehiclesService.updateVehicle(
      updateVehicleDto, +id, name);
  }

 @Delete(':id')
async remove(@Param('id') id: string/*, @GetUser() userInformation: JwtPayload*/) {
  //const {name} = userInformation;
  const authenticatedUserId = 'Yonatan'; // ID del usuario autenticado, hardcodeado para pruebas
  //return this.vehiclesService.removeVehicle(+id, name);
  return this.vehiclesService.removeVehicle(+id, authenticatedUserId);
}


}
