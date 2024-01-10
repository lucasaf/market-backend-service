import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { CREATE_PRODUCT_USE_CASE } from '../shared/constants';
import { ProductService } from './product.service';

let productService: ProductService;
let mockCreateProductUseCase;

beforeEach(async () => {
  mockCreateProductUseCase = {
    execute: jest.fn().mockResolvedValue(new Product()),
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductService,
      {
        provide: CREATE_PRODUCT_USE_CASE,
        useValue: mockCreateProductUseCase,
      },
    ],
  }).compile();

  productService = module.get<ProductService>(ProductService);
});

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
