import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { LocationRepository } from './location.repository';

describe('LocationRepository', () => {
  let locationRepository: LocationRepository;
  let mockRepository: Repository<Location>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocationRepository,
        {
          provide: getRepositoryToken(Location),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    locationRepository = module.get<LocationRepository>(LocationRepository);
    mockRepository = module.get<Repository<Location>>(
      getRepositoryToken(Location),
    );
  });

  describe('createLocation', () => {
    it('should create a new location', async () => {
      const mockLocationDto = { name: 'Test Location' };
      const expectedLocation = new Location();

      jest.spyOn(mockRepository, 'create').mockReturnValue(expectedLocation);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedLocation);

      const result = await locationRepository.createLocation(mockLocationDto);

      expect(result).toEqual(expectedLocation);
      expect(mockRepository.create).toHaveBeenCalledWith(mockLocationDto);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedLocation);
    });

    it('should throw an error if saving the location fails', async () => {
      const mockLocationDto = { name: 'Test Location' };
      const expectedLocation = new Location();

      jest.spyOn(mockRepository, 'create').mockReturnValue(expectedLocation);
      jest.spyOn(mockRepository, 'save').mockImplementation(() => {
        throw new Error('Save operation failed');
      });

      await expect(
        locationRepository.createLocation(mockLocationDto),
      ).rejects.toThrow('Save operation failed');
    });
  });

  describe('updateLocation', () => {
    it('should update an existing location', async () => {
      const mockUpdateDto = { name: 'Updated Location' };
      const mockLocation = {
        id: 'some-id',
        name: 'Test Location',
        createdAt: new Date(),
        updatedAt: new Date(),
        productLocations: [],
      };
      const updatedLocation = { ...mockLocation, ...mockUpdateDto };

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockLocation);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(updatedLocation);

      const result = await locationRepository.updateLocation(
        mockLocation.id,
        mockUpdateDto,
      );

      expect(result).toEqual(updatedLocation);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedLocation);
    });

    it('should throw an error if the location does not exist', async () => {
      const mockId = '123';
      const mockUpdateDto = { name: 'Updated Location' };
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        locationRepository.updateLocation(mockId, mockUpdateDto),
      ).rejects.toThrow(`Location with ID ${mockId} not found.`);
    });
  });

  describe('deleteLocation', () => {
    it('should delete an existing location', async () => {
      const mockId = 'some-id';
      jest
        .spyOn(mockRepository, 'delete')
        .mockResolvedValue({ affected: 1, raw: {} });

      await locationRepository.deleteLocation(mockId);

      expect(mockRepository.delete).toHaveBeenCalledWith(mockId);
    });

    it('should throw an error if the location does not exist', async () => {
      const mockId = 'invalid-id';
      jest
        .spyOn(mockRepository, 'delete')
        .mockResolvedValue({ affected: 0, raw: {} });

      await expect(locationRepository.deleteLocation(mockId)).rejects.toThrow(
        `Location with ID ${mockId} not found.`,
      );
    });
  });

  describe('findLocationById', () => {
    it('should return a location if found', async () => {
      const mockLocation = new Location();
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockLocation);

      const result = await locationRepository.findLocationById('someId');

      expect(result).toEqual(mockLocation);
    });

    it('should throw an error if no location is found', async () => {
      const mockId = 'invalidId';
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(locationRepository.findLocationById(mockId)).rejects.toThrow(
        `Location with ID ${mockId} not found.`,
      );
    });
  });

  describe('findAllLocations', () => {
    it('should return an array of locations', async () => {
      const mockLocations = [new Location(), new Location()];
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockLocations);

      const result = await locationRepository.findAllLocations();

      expect(result).toEqual(mockLocations);
    });

    it('should return an empty array if no locations are found', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValue([]);

      const result = await locationRepository.findAllLocations();

      expect(result).toEqual([]);
    });
  });
});
