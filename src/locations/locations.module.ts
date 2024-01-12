import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './controllers/locations.controller';
import { Location } from './entities/location.entity';
import { LocationRepository } from './repositories/location.repository';
import { LocationsService } from './services/locations.service';
import {
  CREATE_LOCATION_USE_CASE,
  DELETE_LOCATION_USE_CASE,
  LOCATION_REPOSITORY,
  UPDATE_LOCATION_USE_CASE,
} from './shared/constants';
import { CreateLocationUseCase } from './use-cases/create-location.use-case';
import { DeleteLocationUseCase } from './use-cases/delete-location.use-case';
import { UpdateLocationUseCase } from './use-cases/update-location.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    {
      provide: LOCATION_REPOSITORY,
      useClass: LocationRepository,
    },
    {
      provide: CREATE_LOCATION_USE_CASE,
      useClass: CreateLocationUseCase,
    },
    {
      provide: UPDATE_LOCATION_USE_CASE,
      useClass: UpdateLocationUseCase,
    },
    {
      provide: DELETE_LOCATION_USE_CASE,
      useClass: DeleteLocationUseCase,
    },
  ],
})
export class LocationsModule {}
