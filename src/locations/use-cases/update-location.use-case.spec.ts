import { Test, TestingModule } from '@nestjs/testing';
import { Location } from '../entities/location.entity';
import { LOCATION_REPOSITORY } from '../shared/constants';
import { UpdateLocationUseCase } from './update-location.use-case';

describe('UpdateLocationUseCase', () => {
  let updateLocationUseCase: UpdateLocationUseCase;
  let mockLocationRepository;

  beforeEach(async () => {
    mockLocationRepository = {
      updateLocation: jest.fn().mockResolvedValue(new Location()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateLocationUseCase,
        {
          provide: LOCATION_REPOSITORY,
          useValue: mockLocationRepository,
        },
      ],
    }).compile();

    updateLocationUseCase = module.get<UpdateLocationUseCase>(
      UpdateLocationUseCase,
    );
  });

  describe('execute', () => {
    it('should update a location successfully', async () => {
      const mockId = '123';
      const mockUpdateDto = { name: 'Updated Location' };
      const updatedLocation = { id: mockId, ...mockUpdateDto };

      jest
        .spyOn(mockLocationRepository, 'updateLocation')
        .mockResolvedValue(updatedLocation);

      const result = await updateLocationUseCase.execute(mockId, mockUpdateDto);

      expect(result).toEqual(updatedLocation);
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledWith(
        mockId,
        mockUpdateDto,
      );
    });

    it('should throw an error if the location does not exist', async () => {
      const mockId = 'nonExistentId';
      const mockUpdateDto = { name: 'Updated Location' };

      jest
        .spyOn(mockLocationRepository, 'updateLocation')
        .mockImplementation(() => {
          throw new Error('Location not found');
        });

      await expect(
        updateLocationUseCase.execute(mockId, mockUpdateDto),
      ).rejects.toThrow('Location not found');
    });
  });
});
