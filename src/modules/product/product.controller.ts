import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDTO, updateProductDTO } from './validation/product.dto';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';

@Controller('products')
export class productController {
  constructor(private readonly _ProductService: ProductService) {}
  //================= create product ==============//
  @Post('create')
  @Roles(['admin', 'user'])
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: createProductDTO,
    @Req() request: any,
  ): Promise<any> {
    return this._ProductService.createProduct(body, request.user);
  }
  //============get all product=============//
  @Get('')
  getProduct(): any {
    return this._ProductService.getProductService();
  }
  @Get('/:id')
  @Roles(['admin', 'user'])
  @UseGuards(AuthGuard)
  getProductById(@Param('id') id: Types.ObjectId): any {
    return this._ProductService.getProductByIdService(id);
  }
  @Patch('update/:id')
  @Roles(['admin', 'user'])
  @UseGuards(AuthGuard)
  updateProduct(@Param() params: any, @Body() body: updateProductDTO) {
    return this._ProductService.updateProductByIdService(params.id, body);
  }
  @Delete('delete/:id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  deleteProduct(@Param() params: any) {
    return this._ProductService.deleteProductByIdService(params.id);
  }
}
