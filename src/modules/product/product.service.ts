import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDbService } from './product.db.service';
import { createProductDTO, updateProductDTO } from './validation/product.dto';
import { Product } from 'src/schemas/product.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(private _ProductDbService: ProductDbService) {}
  //================= createProduct ==============//
  async createProduct(
    data: createProductDTO,
    user: object,
  ): Promise<createProductDTO> {
    data.createdBy = user['id'];
    const product = await this._ProductDbService.createProduct(data);

    return product;
  }
  //================== getAllProductService ============//
  async getProductService(): Promise<Product[]> {
    const products = await this._ProductDbService.getAllProducts();
    return products;
  }
  //================== get product by id ============//
  async getProductByIdService(id: Types.ObjectId): Promise<Product> {
    const product = await this._ProductDbService.getProductById(id);
    if (!product) {
      throw new NotFoundException('id not found ');
    }
    return product;
  }
  //======================== updateProductByIdService===============//
  async updateProductByIdService(id: Types.ObjectId, body: updateProductDTO) {
    const product = await this._ProductDbService.updateProduct(id, body);

    return product;
  }
  //======================= deleteProductByIdService============//
  async deleteProductByIdService(id: Types.ObjectId) {
    const product = await this._ProductDbService.deleteProduct(id);
    if (product == false) {
      throw new NotFoundException('id not found ');
    }
    return product;
  }
}
