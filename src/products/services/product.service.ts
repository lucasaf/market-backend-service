import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CREATE_PRODUCT_USE_CASE } from '../shared/constants';
import { ICreateProductUseCase } from '../use-cases/interfaces/create-product.use-case.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE)
    private readonly createProductUseCase: ICreateProductUseCase,
  ) {}

  createProduct(createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
}
