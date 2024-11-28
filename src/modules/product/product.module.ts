import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productInjectionToken } from 'src/modules/product/models/product.model';
import { userInjectionToken } from '../auth/models';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [userInjectionToken, productInjectionToken, JwtModule, AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
