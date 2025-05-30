import { Module } from '@nestjs/common';
import { ClientsService } from './service/clients.service';
import { ClientsController } from './controller/clients.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsRepository } from './repository/clients.repository';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService,PrismaService, ClientsRepository],
  
})
export class ClientsModule {}
