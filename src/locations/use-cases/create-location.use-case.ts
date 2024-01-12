import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { Location } from '../entities/location.entity';
import { ILocationRepository } from '../repositories/interfaces/location.repository.interface';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { ICreateLocationUseCase } from './interfaces/create-location.use-case.interface';

@Injectable()
export class CreateLocationUseCase implements ICreateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationRepository.createLocation(createLocationDto);
  }
}
