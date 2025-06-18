import { Injectable } from '@nestjs/common';
import { BranchRepository } from '../repository/branch.repository';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  // Crear una nueva sucursal
  async create(createBranchDto: CreateBranchDto) {
    return await this.branchRepository.create(createBranchDto);
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>, state?: string, city?: string) {
    return await this.branchRepository.findAll(queryFilter, state, city);
  }


  // Obtener una sucursal por ID con datos relacionados
  async findOne(id: number) {
    const branch = await this.branchRepository.findOne(id);
    if (!branch) {
      throw new Error(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  // Actualizar una sucursal
  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const updatedBranch = await this.branchRepository.update(id, updateBranchDto);
    if (!updatedBranch) {
      throw new Error(`Branch with ID ${id} not found`);
    }
    return updatedBranch;
  }

  // Eliminar una sucursal
async remove(id: number, deletedBy: number) {
  const deletedBranch = await this.branchRepository.delete(id, deletedBy); // Pasa ambos argumentos
  if (!deletedBranch) {
    throw new Error(`Branch with ID ${id} not found`);
  }
  return deletedBranch;
}

}
