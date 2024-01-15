export interface IUpdateQuantityUseCase {
  execute(
    productId: string,
    locationId: string,
    quantity: number,
  ): Promise<void>;
}
