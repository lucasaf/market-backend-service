import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageStorageService {
  private readonly uploadPath = 'images';

  constructor() {
    this.ensureUploadPathExists();
  }

  private ensureUploadPathExists() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveImageFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
    const filePath = path.join(this.uploadPath, fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    return filePath;
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const targetPath = path.resolve(this.uploadPath, file.filename);
    fs.renameSync(file.path, targetPath);

    return targetPath;
  }

  async removeImageFile(
    resourceName: string,
    resourceId: string,
  ): Promise<void> {
    const imagePath = this.findImagePath(resourceName, resourceId);

    if (!imagePath) {
      throw new NotFoundException('Image not found');
    }

    // Excluir o arquivo de imagem
    await fs.promises.unlink(imagePath);
  }

  private findImagePath(
    resourceName: string,
    resourceId: string,
  ): string | null {
    const files = fs.readdirSync(this.uploadPath);

    const fileName = files.find((file) =>
      file.includes(`${resourceName}-${resourceId}`),
    );

    return fileName ? path.join(this.uploadPath, fileName) : null;
  }
}
