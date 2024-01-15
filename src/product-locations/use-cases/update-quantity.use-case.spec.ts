import { Test } from '@nestjs/testing';
import { Location } from '../../locations/entities/location.entity';
import { LOCATION_REPOSITORY } from '../../locations/shared/constants';
import { Product } from '../../products/entities/product.entity';
import { PRODUCT_REPOSITORY } from '../../products/shared/constants';
import { ProductLocation } from '../entities/product-location.entity';
import { PRODUCT_LOCATION_REPOSITORY } from '../shared/constants';
import { UpdateQuantityUseCase } from './update-quantity.use-case';

describe('UpdateQuantityUseCase', () => {
  let updateQuantityUseCase: UpdateQuantityUseCase;
  let mockProductLocationRepository;
  let mockProductRepository;
  let mockLocationRepository;

  beforeEach(async () => {
    mockProductLocationRepository = {
      findProductLocation: jest.fn(),
      updateProductLocation: jest.fn(),
      createProductLocation: jest.fn(),
    };
    mockProductRepository = {
      findById: jest.fn(),
    };
    mockLocationRepository = {
      findLocationById: jest.fn(),
    };
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateQuantityUseCase,
        {
          provide: PRODUCT_LOCATION_REPOSITORY,
          useValue: mockProductLocationRepository,
        },
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
        {
          provide: LOCATION_REPOSITORY,
          useValue: mockLocationRepository,
        },
      ],
    }).compile();

    updateQuantityUseCase = moduleRef.get<UpdateQuantityUseCase>(
      UpdateQuantityUseCase,
    );
  });

  it('should create a new ProductLocation if it does not exist', async () => {
    const productId = '1';
    const locationId = '1';
    const quantity = 10;

    jest
      .spyOn(mockProductRepository, 'findById')
      .mockResolvedValueOnce({ id: 1, ...new Product() });
    jest
      .spyOn(mockLocationRepository, 'findLocationById')
      .mockResolvedValueOnce({ id: 1, ...new Location() });
    jest
      .spyOn(mockProductLocationRepository, 'findProductLocation')
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(mockProductLocationRepository, 'createProductLocation')
      .mockResolvedValueOnce(new ProductLocation());

    await updateQuantityUseCase.execute(productId, locationId, quantity);

    expect(
      mockProductLocationRepository.createProductLocation,
    ).toHaveBeenCalledWith(productId, locationId, quantity);
  });

  it('should update an existing ProductLocation', async () => {
    const productId = '1';
    const locationId = '1';
    const quantity = 5;
    const existingEntry = new ProductLocation();

    jest
      .spyOn(mockProductRepository as any, 'findById')
      .mockResolvedValueOnce({ id: '1', ...new Product() });
    jest
      .spyOn(mockLocationRepository as any, 'findLocationById')
      .mockResolvedValueOnce({ id: '1', ...new Location() });
    jest
      .spyOn(mockProductLocationRepository, 'findProductLocation')
      .mockResolvedValueOnce(existingEntry);
    jest
      .spyOn(mockProductLocationRepository, 'updateProductLocation')
      .mockResolvedValueOnce({ ...existingEntry, quantity });

    await updateQuantityUseCase.execute(productId, locationId, quantity);

    expect(
      mockProductLocationRepository.updateProductLocation,
    ).toHaveBeenCalledWith(existingEntry, quantity);
  });

  it('should throw an error if productId does not exist', async () => {
    const productId = '2';
    const locationId = '1';
    const quantity = 5;

    jest
      .spyOn(mockProductRepository, 'findById')
      .mockRejectedValue(new Error(`Product with ID ${productId} not found.`));

    await expect(
      updateQuantityUseCase.execute(productId, locationId, quantity),
    ).rejects.toThrow(`Product with ID ${productId} not found.`);
  });

  it('should throw an error if locationId does not exist', async () => {
    const productId = '1';
    const locationId = '2';
    const quantity = 5;

    jest
      .spyOn(updateQuantityUseCase as any, 'validateProductId')
      .mockResolvedValueOnce(new Product());

    jest
      .spyOn(mockLocationRepository, 'findLocationById')
      .mockRejectedValueOnce(
        new Error(`Location with ID ${locationId} not found.`),
      );

    await expect(
      updateQuantityUseCase.execute(productId, locationId, quantity),
    ).rejects.toThrow(`Location with ID ${locationId} not found.`);
  });
});
