import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchService } from '../service/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }
@Get()
  async findAll<T>(
    @Query() queryFilter: GenericQueryFilterDto<T>,
    @Query('state') state?: string,
    @Query('city') city?: string,
  ) {
    return await this.branchService.findAll(queryFilter, state, city);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

@Delete(':id')
async remove(@Param('id') id: string, @Body() body: { deletedBy: number }) {
  const { deletedBy } = body;
  if (!deletedBy) {
    throw new Error('The deletedBy field is required.');
  }
  return await this.branchService.remove(+id, deletedBy);
}

}
