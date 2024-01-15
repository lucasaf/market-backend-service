import { Test, TestingModule } from '@nestjs/testing';
import { UPDATE_QUANTITY_USE_CASE } from '../shared/constants';
import { ProductLocationService } from './product-locations.service';

describe('ProductLocationService', () => {
  let productLocationService: ProductLocationService;
  let mockUpdateQuantityUseCaseMock;

  beforeEach(async () => {
    mockUpdateQuantityUseCaseMock = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductLocationService,
        {
          provide: UPDATE_QUANTITY_USE_CASE,
          useValue: mockUpdateQuantityUseCaseMock,
        },
      ],
    }).compile();

    productLocationService = module.get<ProductLocationService>(
      ProductLocationService,
    );
  });

  describe('updateQuantity', () => {
    it('should call UpdateQuantityUseCase.execute with correct parameters', async () => {
      const productId = '1';
      const locationId = '1';
      const quantity = 10;

      await productLocationService.updateQuantity(
        productId,
        locationId,
        quantity,
      );

      expect(mockUpdateQuantityUseCaseMock.execute).toHaveBeenCalledWith(
        productId,
        locationId,
        quantity,
      );
    });

    it('should throw an error when UpdateQuantityUseCase throws an error', async () => {
      const productId = '1';
      const locationId = '2';
      const quantity = 10;
      const errorMessage = 'Error occurred';

      // Mock UpdateQuantityUseCase to throw an error
      jest
        .spyOn(mockUpdateQuantityUseCaseMock, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        productLocationService.updateQuantity(productId, locationId, quantity),
      ).rejects.toThrow(errorMessage);
    });
  });
});
