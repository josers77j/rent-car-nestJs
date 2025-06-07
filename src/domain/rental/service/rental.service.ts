import { Injectable } from "@nestjs/common";
import { RentalRepository } from "../repository/rental.repository";
import { CreateRentalDto } from "../dto/create-rental.dto";
import { UpdateRentalDto } from "../dto/update-rental.dto";

@Injectable()
export class RentalService {
  constructor(private readonly rentalRepository: RentalRepository) {}

  async createRental(createRentalDto: CreateRentalDto) {
    return this.rentalRepository.createRental(createRentalDto);
  }

  async updateRental(id: number, updateRentalDto: UpdateRentalDto) {
    return this.rentalRepository.updateRental(id, updateRentalDto);
  }

  async removeRental(id: number, deletedBy: number) {
    return this.rentalRepository.removeRental(id, deletedBy);
  }

 async findAll() {
  const rentals = await this.rentalRepository.findAll();
  return rentals.map((rental) => ({
    id: rental.id,
    customer: rental.customer?.name,
    vehicle: `${rental.vehicle?.brand} ${rental.vehicle?.model}`,
    createdBy: rental.createdByUser?.name,
    modifiedBy: rental.modifiedByUser?.name,
    deletedBy: rental.deletedByUser?.name,
    startDate: rental.startDate,
    endDate: rental.endDate,
    totalPrice: rental.totalPrice,
    status: rental.status,
    paymentStatus: rental.paymentStatus,
    createdAt: rental.createdAt,
    updatedAt: rental.updatedAt,
    deletedAt: rental.deletedAt,
  }));
}
}
