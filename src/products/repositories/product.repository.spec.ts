import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let mockRepository: Repository<Product>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    mockRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('createProduct', () => {
    it('should successfully create a product', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 100,
        type: 'Type A',
      };
      const expectedProduct = new Product();

      jest.spyOn(mockRepository, 'create').mockReturnValue(expectedProduct);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedProduct);

      const result = await productRepository.createProduct(createProductDto);

      expect(result).toEqual(expectedProduct);
      expect(mockRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedProduct);
    });

    it('should throw an error when saving a product fails', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 100,
        type: 'Type A',
      };

      jest.spyOn(mockRepository, 'create').mockImplementation(() => {
        throw new Error('Database Error');
      });

      await expect(
        productRepository.createProduct(createProductDto),
      ).rejects.toThrow('Database Error');
    });
  });
});
