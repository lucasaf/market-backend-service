import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import {
  CREATE_PRODUCT_USE_CASE,
  UPDATE_PRODUCT_USE_CASE,
} from '../shared/constants';
import { ProductService } from './product.service';

let productService: ProductService;
let mockCreateProductUseCase;
let mockUpdateProductUseCase;

beforeEach(async () => {
  mockCreateProductUseCase = {
    execute: jest.fn().mockResolvedValue(new Product()),
  };
  mockUpdateProductUseCase = {
    execute: jest.fn().mockResolvedValue({ id: '123', ...new Product() }),
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductService,
      {
        provide: CREATE_PRODUCT_USE_CASE,
        useValue: mockCreateProductUseCase,
      },
      {
        provide: UPDATE_PRODUCT_USE_CASE,
        useValue: mockUpdateProductUseCase,
      },
    ],
  }).compile();

  productService = module.get<ProductService>(ProductService);
});

describe('create', () => {
  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      price: 10,
      type: 'type',
    };

    await productService.createProduct(createProductDto);

    expect(mockCreateProductUseCase.execute).toHaveBeenCalledWith(
      createProductDto,
    );
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = '123';
      const updateProductDto = {
        name: 'Test Product',
        price: 10,
        type: 'type',
      };

      await productService.updateProduct(id, updateProductDto);

      expect(mockUpdateProductUseCase.execute).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });
  });
});
