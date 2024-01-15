import { Module } from '@nestjs/common';
import { LocationRepository } from '../locations/repositories/location.repository';
import { LOCATION_REPOSITORY } from '../locations/shared/constants';
import { ProductRepository } from '../products/repositories/product.repository';
import { PRODUCT_REPOSITORY } from '../products/shared/constants';
import { ProductLocationController } from './controllers/product-locations.controller';
import { ProductLocationRepository } from './repositories/product-location.repository';
import { ProductLocationService } from './services/product-locations.service';
import {
  PRODUCT_LOCATION_REPOSITORY,
  UPDATE_QUANTITY_USE_CASE,
} from './shared/constants';
import { UpdateQuantityUseCase } from './use-cases/update-quantity.use-case';

@Module({
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
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: LOCATION_REPOSITORY,
      useClass: LocationRepository,
    },
  ],
})
export class ProductLocationsModule {}
