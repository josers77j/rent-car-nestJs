import { Injectable } from "@nestjs/common";
import { Customer } from '@prisma/client';
import { PrismaService } from "prisma/prisma.service";
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

 
  async findOne(id: number): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({
      where: { id },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });
  }


  async create(createClientDto: CreateClientDto): Promise<any> {
    const { name, email, phone, identification, identificationType, createdBy } = createClientDto;

    const prismaData = {
      name,
      email,
      phone,
      identification,
      identificationType,
      createdByUser: createdBy ? { connect: { id: createdBy } } : undefined,
    };

    const createdClient = await this.prisma.customer.create({
      data: prismaData,
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });

    return this.transformClientResponse(createdClient);
  }

  
  async findAll(): Promise<any[]> {
    const clients = await this.prisma.customer.findMany({
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });

    return clients.map(this.transformClientResponse);
  }

 
  async update(id: number, updateClientDto: UpdateClientDto): Promise<any> {
    const { name, email, phone, identification, identificationType, modifiedBy } = updateClientDto;

    if (modifiedBy) {
      const userExists = await this.prisma.user.findUnique({ where: { id: modifiedBy } });
      if (!userExists) {
        throw new Error(`User with ID ${modifiedBy} does not exist.`);
      }
    }

    const prismaData = {
      name,
      email,
      phone,
      identification,
      identificationType,
      modifiedByUser: modifiedBy ? { connect: { id: modifiedBy } } : undefined,
      updatedAt: new Date(),
    };

    const updatedClient = await this.prisma.customer.update({
      where: { id },
      data: prismaData,
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });

    return this.transformClientResponse(updatedClient);
  }

  
  async softDelete(id: number, deletedBy: number): Promise<any> {
    const deletedClient = await this.prisma.customer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedByUser: { connect: { id: deletedBy } },
      },
      include: {
        createdByUser: { select: { name: true } },
        modifiedByUser: { select: { name: true } },
        deletedByUser: { select: { name: true } },
      },
    });

    return this.transformClientResponse(deletedClient);
  }

  private transformClientResponse(client: Customer & { [key: string]: any }): any {
    return {
      ...client,
      createdBy: client.createdByUser?.name ?? "No asignado",
      modifiedBy: client.modifiedByUser?.name ?? "No asignado",
      deletedBy: client.deletedByUser?.name ?? "No asignado",
    };
  }
}
