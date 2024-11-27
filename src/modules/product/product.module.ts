import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { productController } from './product.controller';
import { productModel } from 'src/schemas/product.schema';
import { ProductDbService } from './product.db.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDbService } from '../auth/auth.db.service';
import { userModel } from 'src/schemas/user.schema';

@Module({
  imports: [productModel, userModel],
  providers: [ProductService, ProductDbService, JwtService, AuthDbService],
  controllers: [productController],
})
export class ProductModule {}
