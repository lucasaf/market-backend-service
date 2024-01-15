import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../locations/repositories/interfaces/location.repository.interface';
import { LOCATION_REPOSITORY } from '../../locations/shared/constants';
import { IProductRepository } from '../../products/repositories/interfaces/product.repository.interface';
import { PRODUCT_REPOSITORY } from '../../products/shared/constants';
import { ProductLocation } from '../entities/product-location.entity';
import { IProductLocationRepository } from '../repositories/interfaces/product-location.repository.interface';
import { PRODUCT_LOCATION_REPOSITORY } from '../shared/constants';
import { IUpdateQuantityUseCase } from './interfaces/update-quantity.use-case.interface';

@Injectable()
export class UpdateQuantityUseCase implements IUpdateQuantityUseCase {
  constructor(
    @Inject(PRODUCT_LOCATION_REPOSITORY)
    private readonly productLocationRepository: IProductLocationRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(
    productId: string,
    locationId: string,
    quantity: number,
  ): Promise<void> {
    await this.validateProductId(productId);
    await this.validateLocationId(locationId);

    const existingEntry: ProductLocation =
      await this.productLocationRepository.findProductLocation(
        productId,
        locationId,
      );

    if (existingEntry) {
      await this.productLocationRepository.updateProductLocation(
        existingEntry,
        quantity,
      );
    } else {
      await this.productLocationRepository.createProductLocation(
        productId,
        locationId,
        quantity,
      );
    }
  }

  private async validateProductId(productId: string): Promise<void> {
    await this.productRepository.findById(productId);
  }

  private async validateLocationId(locationId: string): Promise<void> {
    await this.locationRepository.findLocationById(locationId);
  }
}
