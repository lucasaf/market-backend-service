export interface IDeleteLocationUseCase {
  execute(id: string): Promise<void>;
}
