import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
