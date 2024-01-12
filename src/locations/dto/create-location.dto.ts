import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  readonly name: string;
}
