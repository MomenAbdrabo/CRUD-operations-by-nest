import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, required: true, lowercase: true })
  userName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;
}

export const userSchema = SchemaFactory.createForClass(User);

export const userModel = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);
