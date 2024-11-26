import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { signupDTO } from './validation/auth.dto';

@Injectable()
export class AuthDbService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: signupDTO): Promise<User> {
    const { userName, email, password, role } = data;

    const hashPassword = bcrypt.hashSync(password, 8);
    const user = await this.userModel.create({
      userName,
      email,
      password: hashPassword,
      role,
    });
    return user;
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
