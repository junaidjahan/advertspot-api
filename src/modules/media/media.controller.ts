import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  @Post('images')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads/images' }))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
