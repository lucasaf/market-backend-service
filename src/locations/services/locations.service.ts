import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../entities/location.entity';
import {
  CREATE_LOCATION_USE_CASE,
  DELETE_LOCATION_USE_CASE,
  UPDATE_LOCATION_USE_CASE,
} from '../shared/constants';
import { ICreateLocationUseCase } from '../use-cases/interfaces/create-location.use-case.interface';
import { IDeleteLocationUseCase } from '../use-cases/interfaces/delete-location.use-case.interface';
import { IUpdateLocationUseCase } from '../use-cases/interfaces/update-location.use-case.interface';

@Injectable()
export class LocationsService {
  constructor(
    @Inject(CREATE_LOCATION_USE_CASE)
    private readonly createLocationUseCase: ICreateLocationUseCase,
    @Inject(UPDATE_LOCATION_USE_CASE)
    private readonly updateLocationUseCase: IUpdateLocationUseCase,
    @Inject(DELETE_LOCATION_USE_CASE)
    private readonly deleteLocationUseCase: IDeleteLocationUseCase,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.createLocationUseCase.execute(createLocationDto);
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return await this.updateLocationUseCase.execute(id, updateLocationDto);
  }

  async remove(id: string): Promise<void> {
    return await this.deleteLocationUseCase.execute(id);
  }
}
