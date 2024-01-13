import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLocation } from '../entities/product-location.entity';
import { IProductLocationRepository } from './interfaces/product-location.repository.interface';

export class ProductLocationRepository implements IProductLocationRepository {
  constructor(
    @InjectRepository(ProductLocation)
    private productLocationRepository: Repository<ProductLocation>,
  ) {}

  async findProductLocation(
    productId: string,
    locationId: string,
  ): Promise<ProductLocation | undefined> {
    return await this.productLocationRepository.findOne({
      where: { product: { id: productId }, location: { id: locationId } },
    });
  }

  async createProductLocation(
    productId: string,
    locationId: string,
    quantity: number,
  ): Promise<ProductLocation> {
    const productLocationData = { productId, locationId, quantity };
    const productLocation =
      this.productLocationRepository.create(productLocationData);

    return await this.productLocationRepository.save(productLocation);
  }

  async updateProductLocation(
    productLocation: ProductLocation,
    quantity: number,
  ): Promise<ProductLocation> {
    productLocation.quantity = this.updateQuantity(
      productLocation.quantity,
      quantity,
    );

    return this.productLocationRepository.save(productLocation);
  }

  private updateQuantity(
    entryQuantity: number,
    existingQuantity: number,
  ): number {
    return Math.round((existingQuantity + entryQuantity) * 100) / 100;
  }
}
