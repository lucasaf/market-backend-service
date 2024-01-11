import { UpdateProductDto } from '../../dto/update-product.dto';
import { Product } from '../../entities/product.entity';

export interface IUpdateProductUseCase {
  execute(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
}
