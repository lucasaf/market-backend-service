import { Inject, Injectable } from '@nestjs/common';
import { UPDATE_QUANTITY_USE_CASE } from '../shared/constants';
import { IUpdateQuantityUseCase } from '../use-cases/interfaces/update-quantity.use-case.interface';

@Injectable()
export class ProductLocationService {
  constructor(
    @Inject(UPDATE_QUANTITY_USE_CASE)
    private readonly updateQuantityUseCase: IUpdateQuantityUseCase,
  ) {}

  async updateQuantity(
    productId: string,
    locationId: string,
    quantity: number,
  ): Promise<void> {
    return this.updateQuantityUseCase.execute(productId, locationId, quantity);
  }
}
