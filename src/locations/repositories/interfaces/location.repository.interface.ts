import { CreateLocationDto } from '../../dto/create-location.dto';
import { UpdateLocationDto } from '../../dto/update-location.dto';
import { Location } from '../../entities/location.entity';

export interface ILocationRepository {
  createLocation(createLocationDto: CreateLocationDto): Promise<Location>;
  updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location>;
  deleteLocation(id: string): Promise<void>;
  findLocationById(id: string): Promise<Location>;
  findAllLocations(): Promise<Location[]>;
}
