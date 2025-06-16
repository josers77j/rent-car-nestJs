import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto, createdBy: number) {
    return this.companyRepository.create(createCompanyDto, createdBy);
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne(id);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, modifiedBy: number) {
    const company = await this.companyRepository.update(id, updateCompanyDto, modifiedBy);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  }

  async remove(id: number, deletedBy: number) {
    const company = await this.companyRepository.delete(id, deletedBy);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  }
}
