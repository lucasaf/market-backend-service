import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImageStorageService } from './images-storage.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly imageStorageService: ImageStorageService,
  ) {}

  async saveImageData(
    file: Express.Multer.File,
    resourceId: string,
    resourceName: string,
  ): Promise<Image> {
    const filePath = await this.imageStorageService.saveImageFile(file);

    const newImage = new Image();
    newImage.resourceId = resourceId;
    newImage.resourceName = resourceName;
    newImage.url = filePath;

    return await this.imageRepository.save(newImage);
  }

  async findAllForResource(
    resourceName: string,
    resourceId: string,
  ): Promise<Image[]> {
    const images = await this.imageRepository.find({
      where: {
        resourceName,
        resourceId,
      },
    });

    if (!images) {
      throw new NotFoundException(
        `No images found for resource: ${resourceName} with ID: ${resourceId}`,
      );
    }

    return images;
  }

  async removeForResource(
    resourceName: string,
    resourceId: string,
  ): Promise<void> {
    const images = await this.imageRepository.find({
      where: {
        resourceId: resourceId,
        resourceName: resourceName,
      },
    });

    if (images.length === 0) {
      throw new NotFoundException(
        `No images found for resource: ${resourceName} with ID: ${resourceId}`,
      );
    }

    const promises = images.map((image) => this.imageRepository.remove(image));

    await Promise.all(promises);
  }
}
