import { Test, TestingModule } from '@nestjs/testing';
import { Location } from '../entities/location.entity';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { DeleteLocationUseCase } from './delete-location.use-case';

describe('DeleteLocationUseCase', () => {
  let deleteLocationUseCase: DeleteLocationUseCase;
  let mockLocationRepository;

  beforeEach(async () => {
    mockLocationRepository = {
      deleteLocation: jest.fn().mockResolvedValue(new Location()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteLocationUseCase,
        {
          provide: LOCATION_REPOSITORY,
          useValue: mockLocationRepository,
        },
      ],
    }).compile();

    deleteLocationUseCase = module.get<DeleteLocationUseCase>(
      DeleteLocationUseCase,
    );
  });

  describe('execute', () => {
    it('should call deleteLocation on locationService with correct id', async () => {
      const mockId = '123';
      await deleteLocationUseCase.execute(mockId);

      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledWith(
        mockId,
      );
    });
  });
});
