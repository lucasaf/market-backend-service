import { Inject, Injectable } from '@nestjs/common';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../entities/location.entity';
import { ILocationRepository } from '../repositories/interfaces/location.repository.interface';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { IUpdateLocationUseCase } from './interfaces/update-location.use-case.interface';

@Injectable()
export class UpdateLocationUseCase implements IUpdateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationRepository.updateLocation(id, updateLocationDto);
  }
}
