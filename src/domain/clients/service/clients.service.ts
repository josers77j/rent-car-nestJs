import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository:ClientsRepository){
  
  }
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll() {
    try {
      return await this.clientsRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('ocurrio un error al obtener los clientes')
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
