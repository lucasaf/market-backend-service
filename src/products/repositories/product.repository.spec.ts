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
            findOneBy: jest.fn(),
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

  describe('findById', () => {
    it('should return a product if found', async () => {
      const mockProduct = new Product();
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockProduct);

      const result = await productRepository.findById('someId');

      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if no product is found', async () => {
      const mockId = 'invalidId';
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(productRepository.findById(mockId)).rejects.toThrow(
        `Product with ID ${mockId} not found.`,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [new Product(), new Product()];
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockProducts);

      const result = await productRepository.findAll();

      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products are found', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValue([]);

      const result = await productRepository.findAll();

      expect(result).toEqual([]);
    });
  });
});
