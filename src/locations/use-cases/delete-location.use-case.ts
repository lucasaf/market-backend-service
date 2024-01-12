import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../repositories/interfaces/location.repository.interface';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { IDeleteLocationUseCase } from './interfaces/delete-location.use-case.interface';

@Injectable()
export class DeleteLocationUseCase implements IDeleteLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return await this.locationRepository.deleteLocation(id);
  }
}
