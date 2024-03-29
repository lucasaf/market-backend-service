import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import {
  CREATE_PRODUCT_USE_CASE,
  DELETE_PRODUCT_USE_CASE,
  PRODUCT_REPOSITORY,
  UPDATE_PRODUCT_USE_CASE,
} from './shared/constants';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: CREATE_PRODUCT_USE_CASE,
      useClass: CreateProductUseCase,
    },
    {
      provide: UPDATE_PRODUCT_USE_CASE,
      useClass: UpdateProductUseCase,
    },
    {
      provide: DELETE_PRODUCT_USE_CASE,
      useClass: DeleteProductUseCase,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
