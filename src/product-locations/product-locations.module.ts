import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from '../locations/locations.module';
import { ProductModule } from '../products/product.module';
import { ProductLocationController } from './controllers/product-locations.controller';
import { ProductLocation } from './entities/product-location.entity';
import { ProductLocationRepository } from './repositories/product-location.repository';
import { ProductLocationService } from './services/product-locations.service';
import {
  PRODUCT_LOCATION_REPOSITORY,
  UPDATE_QUANTITY_USE_CASE,
} from './shared/constants';
import { UpdateQuantityUseCase } from './use-cases/update-quantity.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLocation]),
    ProductModule,
    LocationsModule,
  ],
  controllers: [ProductLocationController],
  providers: [
    ProductLocationService,
    {
      provide: PRODUCT_LOCATION_REPOSITORY,
      useClass: ProductLocationRepository,
    },
    {
      provide: UPDATE_QUANTITY_USE_CASE,
      useClass: UpdateQuantityUseCase,
    },
  ],
})
export class ProductLocationsModule {}
