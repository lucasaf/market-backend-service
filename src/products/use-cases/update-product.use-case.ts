import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { IUpdateProductUseCase } from './interfaces/update-product.use-case.interface';

@Injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }
}
