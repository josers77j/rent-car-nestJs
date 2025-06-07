import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateRentalDto } from "../dto/create-rental.dto";
import { UpdateRentalDto } from "../dto/update-rental.dto";

@Injectable()
export class RentalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRental(createRentalDto: CreateRentalDto) {
    return this.prisma.rental.create({
      data: createRentalDto,
    });
  }

  async updateRental(id: number, updateRentalDto: UpdateRentalDto) {
    return this.prisma.rental.update({
      where: { id },
      data: updateRentalDto,
    });
  }

  async removeRental(id: number, deletedBy: number) {
    return this.prisma.rental.update({
      where: { id },
      data: { deletedBy, deletedAt: new Date() },
    });
  }

 async findAll() {
  return this.prisma.rental.findMany({
    include: {
      customer: { select: { name: true } },
      vehicle: { select: { brand: true, model: true } },
      createdByUser: { select: { name: true } },
      modifiedByUser: { select: { name: true } },
      deletedByUser: { select: { name: true } },
    },
  });
}

}
