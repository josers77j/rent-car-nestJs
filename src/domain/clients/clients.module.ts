import { Module, forwardRef } from '@nestjs/common';
import { ClientsService } from './service/clients.service';
import { ClientsController } from './controller/clients.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsRepository } from './repository/clients.repository';
import { UsersModule } from '../users/users.module'; 
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, ClientsRepository],
  exports: [ClientsService, ClientsRepository],
  imports: [forwardRef(() => AuthModule),
      forwardRef(() => UsersModule),
    ],
})
export class ClientsModule {}
