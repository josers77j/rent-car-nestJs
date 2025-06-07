import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException,Request } from '@nestjs/common';
import { ClientsService } from '../service/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UsersService } from '../../users/service/users.service';
import { UpdateClientDto } from '../dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService,
     private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

 @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const authenticatedUserId = 3;
      const authenticatedUserName = await this.usersService.getAuthenticatedUserName(authenticatedUserId);

      if (!authenticatedUserName) {
        throw new BadRequestException('No se pudo autenticar al usuario.');
      }

      return await this.clientsService.softDelete(+id, authenticatedUserId);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al eliminar el cliente.');
    }
  }

}
