import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true, lowercase: true })
  name: string;
  @Prop({ trim: true, maxlength: 300 })
  description: string;
  @Prop({ required: true, min: 0 })
  price: number;
  @Prop({ trim: true, lowercase: true })
  category: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  createdBy: User;
}

export const productSchema = SchemaFactory.createForClass(Product);
export const productModel = MongooseModule.forFeature([
  { name: Product.name, schema: productSchema },
]);
