import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { ICreateProductUseCase } from './interfaces/create-product.use-case.interface';

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }
}
