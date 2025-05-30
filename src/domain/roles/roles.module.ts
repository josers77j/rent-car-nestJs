import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './service/roles.service';
import { RolesController } from './controller/roles.controller';
import { PrismaService } from 'prisma/prisma.service';
import { RoleRepository } from './repository/role.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService, RoleRepository],
  imports: [forwardRef(() => AuthModule)],
})
export class RolesModule {}
