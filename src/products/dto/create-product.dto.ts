import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}
