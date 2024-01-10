import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import {
  CREATE_PRODUCT_USE_CASE,
  PRODUCT_REPOSITORY,
} from './shared/constants';
import { CreateProductUseCase } from './use-cases/create-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: CREATE_PRODUCT_USE_CASE,
      useClass: CreateProductUseCase,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
