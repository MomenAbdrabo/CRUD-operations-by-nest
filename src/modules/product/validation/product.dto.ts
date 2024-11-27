import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class createProductDTO {
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
  @IsMongoId()
  @IsOptional()
  createdBy?: string;
}
export class updateProductDTO {
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
export class idDTO {
  @IsMongoId()
  id: string;
}
