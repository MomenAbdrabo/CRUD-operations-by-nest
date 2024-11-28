import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @MaxLength(300)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;
}
