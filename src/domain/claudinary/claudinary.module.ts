import { Module } from '@nestjs/common';
import { ClaudinaryService } from './claudinary.service';
import { ClaudinaryController } from './claudinary.controller';

@Module({
  controllers: [ClaudinaryController],
  providers: [ClaudinaryService],
})
export class ClaudinaryModule {}
