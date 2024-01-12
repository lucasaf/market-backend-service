import { Test, TestingModule } from '@nestjs/testing';
import { Location } from '../entities/location.entity';
import { LocationsService } from '../services/locations.service';
import {
  CREATE_LOCATION_USE_CASE,
  DELETE_LOCATION_USE_CASE,
  UPDATE_LOCATION_USE_CASE,
} from '../shared/constants';
import { LocationsController } from './locations.controller';

describe('LocationsController', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        LocationsService,
        {
          provide: CREATE_LOCATION_USE_CASE,
          useValue: {
            execute: jest.fn().mockResolvedValue(new Location()),
          },
        },
        {
          provide: UPDATE_LOCATION_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue({ id: '123', ...new Location() }),
          },
        },
        {
          provide: DELETE_LOCATION_USE_CASE,
          useValue: {
            execute: jest.fn().mockImplementation(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
