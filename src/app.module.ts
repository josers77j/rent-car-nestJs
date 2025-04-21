import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { RolesModule } from './domain/roles/roles.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
