import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
})
export class UsersModule {}
