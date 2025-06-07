import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';
import { UserRepository } from '../../users/repository/user.repository';
import { MaintenanceRepository } from '../repository/maintenance.repository';

@Injectable()
export class MaintenanceService {
  constructor(private readonly maintenanceRepository: MaintenanceRepository,
      private readonly userRepository: UserRepository, 
  ) {}

  async create(createMaintenanceDto: CreateMaintenanceDto) {
    try {
      await this.maintenanceRepository.createMaintenance(createMaintenanceDto);
      return { message: 'Registro de mantenimiento creado exitosamente.' };
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo crear el mantenimiento: ${error.message}`,
      );
    }
  }

  async findAll() {
  try {
    const maintenanceRecords = await this.maintenanceRepository.findAll();

    // Mapear los nombres de usuario con validación
    const recordsWithUserNames = await Promise.all(
      maintenanceRecords.map(async (record) => {
        const createdBy = record.createdBy !== null
          ? await this.userRepository.findNameById(record.createdBy)
          : 'No asignado';

        const modifiedBy = record.modifiedBy !== null
          ? await this.userRepository.findNameById(record.modifiedBy)
          : 'No asignado';

        const deletedBy = record.deletedBy !== null
          ? await this.userRepository.findNameById(record.deletedBy)
          : 'No asignado';

        return {
          ...record,
          createdBy,
          modifiedBy,
          deletedBy,
        };
      }),
    );

    return recordsWithUserNames;
  } catch (error) {
    throw new InternalServerErrorException(
      `No se pudieron obtener los registros de mantenimiento: ${error.message}`,
    );
  }
}

  async findOne(id: number) {
    try {
      const maintenanceRecord = await this.maintenanceRepository.findOne(id);
      if (!maintenanceRecord) {
        throw new Error(`Registro de mantenimiento con identificación ${id} extraviado.`);
      }
      return maintenanceRecord;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo obtener el registro de mantenimiento: ${error.message}`,
      );
    }
  }

  async update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    try {
      const updatedRecord = await this.maintenanceRepository.updateMaintenance(
        id,
        updateMaintenanceDto,
      );
      return { message: 'Registro de mantenimiento actualizado exitosamente.', updatedRecord };
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo actualizar el registro de mantenimiento: ${error.message}`,
      );
    }
  }

async softDelete(id: number, deletedBy: number): Promise<{ message: string }> {
  const record = await this.maintenanceRepository.findOne(id);
  if (!record) {
    throw new Error(`Registro de mantenimiento con identificación ${id} extraviado.`);
  }
  await this.maintenanceRepository.softDeleteMaintenance(id, deletedBy);
  return { message: 'Registro de mantenimiento eliminado con éxito.' };
}


}
