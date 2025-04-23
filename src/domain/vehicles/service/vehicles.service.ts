import { Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicles.repository';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { GenericQueryFilterDto } from 'src/domain/Dto/generic-query-filter.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
  
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

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    try {
      const createProcess = await this.vehicleRepository.createVehicle(createVehicleDto);
      if (!createProcess)
        throw new UnprocessableEntityException(
          'Ocurrió un error al crear el vehículo',
        );

      return { message: 'Vehículo creado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException('Error al crear el vehículo');
    }
  }

  async updateVehicle(updateVehicleDto: UpdateVehicleDto, id: number) {
    try {
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

  async removeVehicle(id: number) {
    try {
      const removeProcess = await this.vehicleRepository.removeVehicle(
        id
      );
      if (!removeProcess)
        throw new UnprocessableEntityException(
          'Ocurrió un error al eliminar el vehículo',
        );

      return { message: 'Vehículo eliminado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException('Error al eliminar el vehículo');
    }
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    try {
      return await this.vehicleRepository.findAll(queryFilter);
    } catch (error) {
      Logger.error(error);
      
      throw new InternalServerErrorException('Error al obtener los vehículos');
    }
  }
}
