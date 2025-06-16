import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ClientsService } from '../service/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>, @Query('name') name: string) {
    return this.clientsService.findAll(queryFilter, name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const authenticatedUserId = 3; // Placeholder for authenticated user ID
    return await this.clientsService.softDelete(+id, authenticatedUserId);
  }
}
