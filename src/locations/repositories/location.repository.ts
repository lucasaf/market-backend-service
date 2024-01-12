import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../entities/location.entity';
import { ILocationRepository } from './interfaces/location.repository.interface';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const { name } = createLocationDto;
    const newLocation = { name };

    const newLocationEntity = this.locationRepository.create(newLocation);

    return await this.locationRepository.save(newLocationEntity);
  }

  async findLocationById(id: string): Promise<Location> {
    const location = await this.locationRepository.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found.`);
    }

    return location;
  }

  async findAllLocations(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const { name } = updateLocationDto;

    const partialLocation = {
      name,
    };

    const location = await this.locationRepository.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found.`);
    }

    Object.assign(location, partialLocation);

    return this.locationRepository.save(location);
  }

  async deleteLocation(id: string): Promise<void> {
    const result = await this.locationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found.`);
    }
  }
}
