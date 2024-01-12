import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { IProductRepository } from './interfaces/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, type } = createProductDto;
    const newProduct = {
      name,
      price,
      type,
    };
    const newProductEntity = this.create(newProduct);

    return await this.save(newProductEntity);
  }

  async updateProduct(
    id,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, price, type } = updateProductDto;

    const partialProduct = {
      id,
      name,
      price,
      type,
    };

    const product = await this.preload(partialProduct);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    Object.assign(product, updateProductDto);

    return this.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }
}
