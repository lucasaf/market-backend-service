import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { PRODUCT_REPOSITORY } from '../shared/constants';
import { CreateProductUseCase } from './create-product.use-case';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let mockProductRepository;

  beforeEach(async () => {
    mockProductRepository = {
      createProduct: jest.fn().mockResolvedValue(new Product()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should call createProduct on the repository when executing', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      price: 10,
      type: 'Sample Type',
    };
    const expectedResult = new Product();

    Object.assign(expectedResult, createProductDto);

    jest
      .spyOn(mockProductRepository, 'createProduct')
      .mockResolvedValue(expectedResult);

    const result = await createProductUseCase.execute(createProductDto);

    expect(result).toEqual(expectedResult);
  });

  it('should fail if the product data is invalid', async () => {
    const invalidProductData: CreateProductDto = {
      name: '',
      price: -10,
      type: '',
    }; // Invalid data
    jest
      .spyOn(mockProductRepository, 'createProduct')
      .mockImplementation(() => {
        throw new Error('Invalid product data');
      });

    await expect(
      createProductUseCase.execute(invalidProductData),
    ).rejects.toThrow('Invalid product data');
  });

  it('should throw an exception if the repository fails to save the product', async () => {
    const productData: CreateProductDto = {
      name: 'Valid Name',
      price: 100,
      type: 'Valid Type',
    };
    jest
      .spyOn(mockProductRepository, 'createProduct')
      .mockRejectedValue(new Error('Database error'));

    await expect(createProductUseCase.execute(productData)).rejects.toThrow(
      'Database error',
    );
  });
});
