import { IsInt, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsOptional()
  createdBy?: number;

    @IsInt()
  @IsOptional()
  modifiedBy?: number;

    @IsInt()
  @IsOptional()
  deletedBy?: number;
}
