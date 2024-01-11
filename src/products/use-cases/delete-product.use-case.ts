import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { IDeleteProductUseCase } from './interfaces/delete-product.use-case.interface';

@Injectable()
export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
