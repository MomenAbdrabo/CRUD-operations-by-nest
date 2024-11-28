import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/modules/product/models/product.model';
import { Model, Types } from 'mongoose';
import { User } from 'src/modules/auth/models/user.model';
import { CreateProductDTO, UpdateProductDTO } from './dtos';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly Product: Model<Product>,
  ) {}

  async createProduct(data: CreateProductDTO, user: User): Promise<Product> {
    const product = await this.Product.create({
      ...data,
      createdBy: user['id'],
    });
    return product;
  }

  async search(): Promise<Product[]> {
    // TODO: add filter + pagination
    const products = await this.Product.find();
    return products;
  }

  async getById(id: Types.ObjectId): Promise<Product> {
    const product = await this.Product.findById(id);
    if (!product) {
      throw new NotFoundException('id not found ');
    }

    return product;
  }

  async updateById(id: Types.ObjectId, body: UpdateProductDTO) {
    const product = await this.Product.findById(id);
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
    // to be able to update description to be empty/null
    if ('description' in body) {
      product.description = body.description;
    }

    await product.save();

    return product;
  }

  async deleteById(id: Types.ObjectId) {
    const result = await this.Product.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      throw new NotFoundException(`Product with id=${id} not found `);
    }

    return true;
  }
}
