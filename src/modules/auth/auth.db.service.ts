import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { signupDTO } from './validation/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthDbService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly config: ConfigService,
  ) {}

  async createUser(data: signupDTO): Promise<User> {
    const { userName, email, password, role } = data;
    const hashPassword = bcrypt.hashSync(
      password,
      parseInt(this.config.get<string>('SALT_ROUND')),
    );
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
  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user;
  }
}
