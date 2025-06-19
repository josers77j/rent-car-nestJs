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
  createdBy?: string;

    @IsInt()
  @IsOptional()
  modifiedBy?: string;

    @IsInt()
  @IsOptional()
  deletedBy?: string;
}