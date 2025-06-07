import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
  exports: [UsersService,UserRepository],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
