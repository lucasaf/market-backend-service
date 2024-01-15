import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductLocationService } from '../services/product-locations.service';

@Controller('product-locations')
export class ProductLocationController {
  constructor(
    private readonly productLocationService: ProductLocationService,
  ) {}

  @Post('update-quantity')
  @HttpCode(HttpStatus.OK)
  async updateQuantity(
    @Body('productId') productId: string,
    @Body('locationId') locationId: string,
    @Body('quantity') quantity: number,
  ): Promise<void> {
    await this.productLocationService.updateQuantity(
      productId,
      locationId,
      quantity,
    );
  }
}
