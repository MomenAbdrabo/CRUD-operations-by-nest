import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  category: string;

  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
