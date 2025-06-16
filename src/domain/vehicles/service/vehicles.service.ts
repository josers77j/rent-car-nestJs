import { Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicles.repository';
import { Vehicle } from '@prisma/client';
import { UsersService } from '../../users/service/users.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { create } from 'domain';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository,
      private readonly usersService: UsersService
  ) {}
  
  /*async findOneByVehicleId(id: string) {
    try {
      const process = await this.vehicleRepository.findOneByVehicleId(id);
      if (!process)
        throw new UnauthorizedException(
          'Vehículo no encontrado, intente de nuevo',
        );
      return process;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException('Error al obtener el vehículo');
    }
  }*/

async createVehicle(createVehicleDto: CreateVehicleDto, name: string) {
 
  createVehicleDto.createdBy = name;

  return this.vehicleRepository.createVehicle(createVehicleDto);
}

  async updateVehicle(updateVehicleDto: UpdateVehicleDto, id: number, name: string) {
    try {

      updateVehicleDto.modifiedBy = name;

      const updateProcess = await this.vehicleRepository.updateVehicle(
        id,
        updateVehicleDto
      );
      if (!updateProcess)
        throw new UnprocessableEntityException(
          'Ocurrió un error al actualizar el vehículo',
        );

      return { message: 'Vehículo actualizado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;

      throw new InternalServerErrorException(
        'Error al actualizar el vehículo'
      );
    }
  }

  async removeVehicle(id: number, deletedBy: string) {
  try {
    const removeProcess = await this.vehicleRepository.removeVehicle(id, deletedBy);
    if (!removeProcess) {
      throw new UnprocessableEntityException('Ocurrió un error al eliminar el vehículo');
    }

    return { message: 'Vehículo eliminado exitosamente' };
  } catch (err) {
    Logger.error(err);
    if (err instanceof UnprocessableEntityException) throw err;
    throw new InternalServerErrorException('Error al eliminar el vehículo');
  }
}


 async findAll(queryFilter: GenericQueryFilterDto<Vehicle>): Promise<any> {
  return await this.vehicleRepository.findAll(queryFilter);

 
}


}
