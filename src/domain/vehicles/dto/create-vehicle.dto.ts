import { VehicleStatus, VehicleType } from "@prisma/client";
import {
    IsNotEmpty,
    IsString,
    IsNumber,
} from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    brand: string;
    
    @IsNotEmpty()
    @IsString()
    model: string;
    
    @IsNumber()
    @IsNotEmpty()
    year: number;
    
    @IsNotEmpty()
    @IsString()
    plateNumber: string;

    @IsNotEmpty()
    @IsString()
    type: VehicleType;

    @IsNotEmpty()
    @IsString()
    status: VehicleStatus;

    @IsNotEmpty()
    @IsNumber()
    dailyRate: number;
}
