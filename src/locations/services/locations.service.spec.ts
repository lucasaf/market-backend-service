import { Test, TestingModule } from '@nestjs/testing';
import { Location } from '../entities/location.entity';
import {
  CREATE_LOCATION_USE_CASE,
  DELETE_LOCATION_USE_CASE,
  UPDATE_LOCATION_USE_CASE,
} from '../shared/constants';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let locationService: LocationsService;
  let mockCreateLocationUseCase;
  let mockUpdateLocationUseCase;
  let mockDeleteLocationUseCase;

  beforeEach(async () => {
    mockCreateLocationUseCase = {
      execute: jest.fn().mockResolvedValue(new Location()),
    };
    mockUpdateLocationUseCase = {
      execute: jest.fn().mockResolvedValue({ id: '123', ...new Location() }),
    };
    mockDeleteLocationUseCase = {
      execute: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: CREATE_LOCATION_USE_CASE,
          useValue: mockCreateLocationUseCase,
        },
        {
          provide: UPDATE_LOCATION_USE_CASE,
          useValue: mockUpdateLocationUseCase,
        },
        {
          provide: DELETE_LOCATION_USE_CASE,
          useValue: mockDeleteLocationUseCase,
        },
      ],
    }).compile();

    locationService = module.get<LocationsService>(LocationsService);
  });

  describe('create', () => {
    it('should create a location', async () => {
      const createLocationDto = {
        name: 'Test location',
      };

      await locationService.create(createLocationDto);

      expect(mockCreateLocationUseCase.execute).toHaveBeenCalledWith(
        createLocationDto,
      );
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const id = '123';
      const updateLocationDto = {
        name: 'Test location',
      };

      await locationService.update(id, updateLocationDto);

      expect(mockUpdateLocationUseCase.execute).toHaveBeenCalledWith(
        id,
        updateLocationDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a location', async () => {
      const id = '123';

      await locationService.remove(id);

      expect(mockDeleteLocationUseCase.execute).toHaveBeenCalledWith(id);
    });
  });
});
