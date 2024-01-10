import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../entities/product.entity';

export interface IProductRepository {
  createProduct(createProductDto: CreateProductDto): Promise<Product>;
}
