import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  describe('createProduct', () => {
    it('should successfully create a product', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 100,
        type: 'Type A',
      };
      const expectedProduct = new Product();

      jest.spyOn(productRepository, 'create').mockReturnValue(expectedProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(expectedProduct);

      const result = await productRepository.createProduct(createProductDto);

      expect(result).toEqual(expectedProduct);
      expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(expectedProduct);
    });

    it('should throw an error when saving a product fails', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 100,
        type: 'Type A',
      };

      jest.spyOn(productRepository, 'create').mockImplementation(() => {
        throw new Error('Database Error');
      });

      await expect(
        productRepository.createProduct(createProductDto),
      ).rejects.toThrow('Database Error');
    });
  });
});
