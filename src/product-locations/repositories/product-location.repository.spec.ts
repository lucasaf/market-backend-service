import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLocation } from '../entities/product-location.entity';
import { ProductLocationRepository } from './product-location.repository';

describe('ProductLocationRepository', () => {
  let productLocationRepository: ProductLocationRepository;
  let mockRepository: Repository<ProductLocation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductLocationRepository,
        {
          provide: getRepositoryToken(ProductLocation),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    productLocationRepository = module.get<ProductLocationRepository>(
      ProductLocationRepository,
    );
    mockRepository = module.get<Repository<ProductLocation>>(
      getRepositoryToken(ProductLocation),
    );
  });

  describe('findProductLocation', () => {
    it('should return a product location when product and location exist', async () => {
      const mockProductLocation = new ProductLocation();
      jest
        .spyOn(mockRepository, 'findOne')
        .mockResolvedValue(mockProductLocation);

      const result = await productLocationRepository.findProductLocation(
        '1',
        '1',
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { product: { id: '1' }, location: { id: '1' } },
      });
      expect(result).toEqual(mockProductLocation);
    });

    it('should return undefined if a ProductLocation does not exist', async () => {
      const productId = '1';
      const locationId = '2';

      jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await productLocationRepository.findProductLocation(
        productId,
        locationId,
      );

      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { product: { id: productId }, location: { id: locationId } },
      });
    });
  });

  describe('createProductLocation', () => {
    const productId = '1';
    const locationId = '1';
    const quantity = 10;

    it('should successfully create a new ProductLocation', async () => {
      const productLocationData = {
        productId: productId,
        locationId: locationId,
        quantity,
      };
      const savedProductLocation = new ProductLocation();

      Object.assign(savedProductLocation, productLocationData);

      jest
        .spyOn(mockRepository, 'create')
        .mockReturnValue(savedProductLocation);
      jest
        .spyOn(mockRepository, 'save')
        .mockResolvedValue(savedProductLocation);

      const result = await productLocationRepository.createProductLocation(
        productId,
        locationId,
        quantity,
      );
      expect(result).toEqual(savedProductLocation);
      expect(mockRepository.create).toHaveBeenCalledWith(productLocationData);
      expect(mockRepository.save).toHaveBeenCalledWith(savedProductLocation);
    });

    it('should throw an error if unable to create a new ProductLocation', async () => {
      const error = new Error('Failed to create');
      jest.spyOn(mockRepository, 'create').mockImplementation(() => {
        throw error;
      });

      await expect(
        productLocationRepository.createProductLocation(
          productId,
          locationId,
          quantity,
        ),
      ).rejects.toThrow(error);
    });
  });

  describe('updateProductLocation', () => {
    let productLocation: ProductLocation;
    let initialQuantity: number;

    beforeEach(() => {
      initialQuantity = 50;
      productLocation = new ProductLocation();
      productLocation.id = 1;
      productLocation.quantity = initialQuantity;
    });

    it('should correctly update the quantity with a positive number', async () => {
      const quantityChange = 10;
      const expectedQuantity = initialQuantity + quantityChange;
      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
        ...productLocation,
        quantity: expectedQuantity,
      });

      const result = await productLocationRepository.updateProductLocation(
        productLocation,
        quantityChange,
      );
      expect(result.quantity).toBe(expectedQuantity);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should correctly update the quantity with a positive decimal number', async () => {
      const quantityChange = 10.5;
      const expectedQuantity = initialQuantity + quantityChange;
      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
        ...productLocation,
        quantity: expectedQuantity,
      });

      const result = await productLocationRepository.updateProductLocation(
        productLocation,
        quantityChange,
      );
      expect(result.quantity).toBe(expectedQuantity);
    });

    it('should correctly update the quantity with a negative number', async () => {
      const quantityChange = -20;
      const expectedQuantity = initialQuantity + quantityChange;
      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
        ...productLocation,
        quantity: expectedQuantity,
      });

      const result = await productLocationRepository.updateProductLocation(
        productLocation,
        quantityChange,
      );
      expect(result.quantity).toBe(expectedQuantity);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: expectedQuantity }),
      );
    });

    it('should correctly update the quantity with a negative decimal number', async () => {
      const quantityChange = -20.3;
      const expectedQuantity = initialQuantity + quantityChange;
      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
        ...productLocation,
        quantity: expectedQuantity,
      });

      const result = await productLocationRepository.updateProductLocation(
        productLocation,
        quantityChange,
      );
      expect(result.quantity).toBe(expectedQuantity);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: expectedQuantity }),
      );
    });

    it('should throw an error if the repository save method fails', async () => {
      const quantityChange = 5;
      const error = new Error('Save failed');
      jest.spyOn(mockRepository, 'save').mockImplementation(() => {
        throw error;
      });

      await expect(
        productLocationRepository.updateProductLocation(
          productLocation,
          quantityChange,
        ),
      ).rejects.toThrow(error);
    });
  });
});
