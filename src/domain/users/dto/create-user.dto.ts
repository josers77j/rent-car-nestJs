import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}

export class passwordUserDto extends PickType(CreateUserDto, ['password']) {
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}

export class UpdateBasicInformationDto extends PickType(CreateUserDto, [
  'roleId',
  'name',
  'email',
] as const) {}

export class updateEmailDto extends PickType(CreateUserDto, ['email']) {}
