import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { CreateProductDTO, UpdateProductDTO } from './dtos';
import { MongoIdPathParamDto } from 'src/common/dtos';

@Controller('products')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: CreateProductDTO,
    @Req() request: Request,
  ): Promise<any> {
    return this._productService.createProduct(body, request['user']);
  }

  @Get()
  getProduct(): any {
    return this._productService.search();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getProductById(@Param() pathParams: MongoIdPathParamDto): any {
    return this._productService.getById(new Types.ObjectId(pathParams.id));
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param() params: MongoIdPathParamDto,
    @Body() body: UpdateProductDTO,
  ) {
    return this._productService.updateById(new Types.ObjectId(params.id), body);
  }

  @Delete('delete/:id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  deleteProduct(@Param() params: MongoIdPathParamDto) {
    return this._productService.deleteById(new Types.ObjectId(params.id));
  }
}
