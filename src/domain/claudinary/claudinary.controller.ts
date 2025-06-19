import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClaudinaryService } from './claudinary.service';

@Controller('claudinary')
export class ClaudinaryController {
  constructor(private readonly claudinaryService: ClaudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.claudinaryService.uploadImage(file);
      return {
        message: 'File uploaded successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        `Error uploading file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}