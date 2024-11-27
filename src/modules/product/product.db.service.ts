import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDTO, updateProductDTO } from './validation/product.dto';
import { Product } from 'src/schemas/product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

Injectable();
export class ProductDbService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  //==================== createProduct ==================//
  async createProduct(data: createProductDTO): Promise<any> {
    const product = await this.productModel.create(data);
    return product;
  }
  //==================== getAllProducts ==================//

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  //==================== getProductById ==================//

  async getProductById(id: Types.ObjectId): Promise<Product | null> {
    const product = await this.productModel.findById(id);
    return product;
  }
  //==================== updateProduct ==================//

  async updateProduct(
    id: Types.ObjectId,
    body: updateProductDTO,
  ): Promise<Product | null> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('id not found ');
    }
    if (body.name) {
      product.name = body.name;
    }
    if (body.price) {
      product.price = body.price;
    }
    if (body.category) {
      product.category = body.category;
    }
    if (body.description) {
      product.description = body.description;
    }
    await product.save();
    return product;
  }

  //==================== deleteProduct=====================//
  async deleteProduct(id: Types.ObjectId): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
