import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { UpdateRentalDto } from '../dto/update-rental.dto';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.createRental(createRentalDto);
  }

 @Get()
findAll() {
  return this.rentalService.findAll();
}


  @Patch(':id')
update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
  const modifiedBy = 1; // Cambiar por lógica de usuario autenticado
  return this.rentalService.updateRental(+id, { ...updateRentalDto, modifiedBy });
}


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedBy = 1; // Cambiar por lógica de obtención de usuario
    return this.rentalService.removeRental(+id, deletedBy);
  }
}
