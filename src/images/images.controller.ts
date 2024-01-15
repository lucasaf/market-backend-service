import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload/:resourceName/:resourceId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('resourceName') resourceName: string,
    @Param('resourceId') resourceId: string,
  ) {
    const savedImage = await this.imagesService.saveImageData(
      file,
      resourceId,
      resourceName,
    );
    return savedImage;
  }

  @Get(':resourceName/:resourceId')
  findAll(
    @Param('resourceName') resourceName: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.imagesService.findAllForResource(resourceName, resourceId);
  }

  @Delete(':resourceName/:resourceId')
  remove(
    @Param('resourceName') resourceName: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.imagesService.removeForResource(resourceName, resourceId);
  }
}
