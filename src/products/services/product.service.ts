import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  CREATE_PRODUCT_USE_CASE,
  DELETE_PRODUCT_USE_CASE,
  UPDATE_PRODUCT_USE_CASE,
} from '../shared/constants';
import { ICreateProductUseCase } from '../use-cases/interfaces/create-product.use-case.interface';
import { IDeleteProductUseCase } from '../use-cases/interfaces/delete-product.use-case.interface';
import { IUpdateProductUseCase } from '../use-cases/interfaces/update-product.use-case.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE)
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject(UPDATE_PRODUCT_USE_CASE)
    private readonly updateProductUseCase: IUpdateProductUseCase,
    @Inject(DELETE_PRODUCT_USE_CASE)
    private readonly deleteProductUseCase: IDeleteProductUseCase,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return await this.updateProductUseCase.execute(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<void> {
    return await this.deleteProductUseCase.execute(id);
  }
}
