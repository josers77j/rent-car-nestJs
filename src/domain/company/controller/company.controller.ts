import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Body('createdBy') createdBy: number // Recoge el ID del creador
  ) {
    return this.companyService.create(createCompanyDto, createdBy);
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Body('modifiedBy') modifiedBy: number // Recoge el ID del modificador
  ) {
    return this.companyService.update(+id, updateCompanyDto, modifiedBy);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body('deletedBy') deletedBy: number // Recoge el ID del eliminador
  ) {
    return this.companyService.remove(+id, deletedBy);
  }
}
