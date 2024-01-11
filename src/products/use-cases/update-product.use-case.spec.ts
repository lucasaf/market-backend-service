import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { UpdateProductUseCase } from './update-product.use-case';

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase;
  let mockProductRepository;

  beforeEach(async () => {
    mockProductRepository = {
      updateProduct: jest.fn().mockResolvedValue(new Product()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    updateProductUseCase =
      module.get<UpdateProductUseCase>(UpdateProductUseCase);
  });

  it('should call updateProduct on the repository when executing', async () => {
    const id = '123';
    const updateProductDto = {
      name: 'Test Product',
      price: 10,
      type: 'Sample Type',
    };
    const expectedResult = new Product();

    Object.assign(expectedResult, updateProductDto);

    jest
      .spyOn(mockProductRepository, 'updateProduct')
      .mockResolvedValue(expectedResult);

    const result = await updateProductUseCase.execute(id, updateProductDto);

    expect(result).toEqual(expectedResult);
  });

  it('should fail if the product data is invalid', async () => {
    const id = '123';
    const invalidProductData = {
      name: '',
      price: -10,
      type: '',
    }; // Invalid data
    jest
      .spyOn(mockProductRepository, 'updateProduct')
      .mockImplementation(() => {
        throw new Error('Invalid product data');
      });

    await expect(
      updateProductUseCase.execute(id, invalidProductData),
    ).rejects.toThrow('Invalid product data');
  });

  it('should throw an exception if the repository fails to save the product', async () => {
    const id = '123';
    const productData = {
      name: 'Valid Name',
      price: 100,
      type: 'Valid Type',
    };
    jest
      .spyOn(mockProductRepository, 'updateProduct')
      .mockRejectedValue(new Error('Database error'));

    await expect(updateProductUseCase.execute(id, productData)).rejects.toThrow(
      'Database error',
    );
  });
});
