import { PartialType } from '@nestjs/swagger';
import { CreateClaudinaryDto } from './create-claudinary.dto';

export class UpdateClaudinaryDto extends PartialType(CreateClaudinaryDto) {}
