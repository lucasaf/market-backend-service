import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const newProductEntity = this.productRepository.create(newProduct);

    return await this.productRepository.save(newProductEntity);
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

    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    Object.assign(product, partialProduct);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
