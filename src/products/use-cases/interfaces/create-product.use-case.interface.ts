import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../entities/product.entity';

export interface ICreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<Product>;
}
