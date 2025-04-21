import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  password: string;
}
