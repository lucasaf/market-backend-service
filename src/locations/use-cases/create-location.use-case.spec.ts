import { Test, TestingModule } from '@nestjs/testing';
import { ILocationRepository } from '../repositories/interfaces/location.repository.interface';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { CreateLocationUseCase } from './create-location.use-case';

describe('CreateLocationUseCase', () => {
  let createLocationUseCase: CreateLocationUseCase;
  let mockLocationRepository: ILocationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLocationUseCase,
        {
          provide: LOCATION_REPOSITORY,
          useValue: {
            createLocation: jest.fn(),
          },
        },
      ],
    }).compile();

    createLocationUseCase = module.get<CreateLocationUseCase>(
      CreateLocationUseCase,
    );
    mockLocationRepository =
      module.get<ILocationRepository>(LOCATION_REPOSITORY);
  });

  describe('execute', () => {
    it('should create a location successfully', async () => {
      const mockLocationDto = {
        name: 'New Location',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const expectedLocation = { id: '1', ...mockLocationDto };

      jest
        .spyOn(mockLocationRepository, 'createLocation')
        .mockResolvedValue(expectedLocation);

      const result = await createLocationUseCase.execute(mockLocationDto);

      expect(result).toEqual(expectedLocation);
      expect(mockLocationRepository.createLocation).toHaveBeenCalledWith(
        mockLocationDto,
      );
    });
  });

  it('should handle repository errors gracefully', async () => {
    const mockLocationDto = { name: 'New Location' };
    const error = new Error('Database error');

    jest
      .spyOn(mockLocationRepository, 'createLocation')
      .mockRejectedValue(error);

    await expect(
      createLocationUseCase.execute(mockLocationDto),
    ).rejects.toThrow('Database error');
  });

  it('should handle invalid input data', async () => {
    const invalidLocationDto = { name: null }; // Invalid data example
    const error = new Error('Invalid input data');

    jest
      .spyOn(mockLocationRepository, 'createLocation')
      .mockRejectedValue(error);

    await expect(
      createLocationUseCase.execute(invalidLocationDto),
    ).rejects.toThrow('Invalid input data');
  });
});
