import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CompanyController } from './controller/company.controller';
import { CompanyRepository } from './repository/company.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, PrismaService],
})
export class CompanyModule {}
