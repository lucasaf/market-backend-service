import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { DeleteProductUseCase } from './delete-product.use-case';

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let mockProductRepository;

  beforeEach(async () => {
    mockProductRepository = {
      deleteProduct: jest.fn().mockResolvedValue(new Product()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    deleteProductUseCase =
      module.get<DeleteProductUseCase>(DeleteProductUseCase);
  });

  it('should call deleteProduct on productService with correct id', async () => {
    const productId = '123';
    await deleteProductUseCase.execute(productId);

    expect(mockProductRepository.deleteProduct).toHaveBeenCalledWith(productId);
  });
});
