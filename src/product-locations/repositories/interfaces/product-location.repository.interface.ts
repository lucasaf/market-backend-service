import { ProductLocation } from '../../entities/product-location.entity';

export interface IProductLocationRepository {
  findProductLocation(
    productId: string,
    locationId: string,
  ): Promise<ProductLocation | undefined>;
  createProductLocation(
    productId: string,
    locationId: string,
    quantity: number,
  ): Promise<ProductLocation>;
  updateProductLocation(
    productLocation: ProductLocation,
    quantity: number,
  ): Promise<ProductLocation>;
}
