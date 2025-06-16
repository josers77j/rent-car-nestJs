import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BranchRepository } from './repository/branch.repository';
import { BranchService } from './service/branch.service';
import { BranchController } from '../branch/controller/branch.controller';

@Module({
  controllers: [BranchController],
  providers: [BranchService, BranchRepository, PrismaService],
})
export class BranchModule {}
