import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from '../repository/clients.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.clientsRepository.create(createClientDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating client.');
    }
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>, name: string) {
    try {
      return await this.clientsRepository.findAll(queryFilter, name);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching clients.');
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    try {
      return await this.clientsRepository.update(id, updateClientDto);
    } catch (error) {
      throw new InternalServerErrorException('Error updating client.');
    }
  }

  async softDelete(id: number, deletedBy: number) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    try {
      return await this.clientsRepository.softDelete(id, deletedBy);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting client.');
    }
  }
}
