import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/schemas/user.schema';
import { loginDTO, signupDTO } from './dtos';

const DEFAULT_SALT_ROUND = '10';
const ONE_HOUR_IN_SECONDS = 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    private readonly User: Model<User>,
    private readonly _jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(data: signupDTO): Promise<{ message: string; user: any }> {
    const { userName, email, password } = data;
    const existingUser = await this.User.findOne({ email: data.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashPassword = bcrypt.hashSync(
      password,
      parseInt(this.config.get<string>('SALT_ROUND', DEFAULT_SALT_ROUND)),
    );
    const user = await this.User.create({
      userName,
      email,
      password: hashPassword,
    });

    return {
      message: 'welcome',
      user,
    };
  }

  async login(
    data: loginDTO,
  ): Promise<{ message: string; accessToken: string }> {
    const { email, password } = data;
    // Check user existence
    const user = await this.User.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // verify user password
    const passwordIsIdentical = bcrypt.compareSync(password, user.password);
    if (!passwordIsIdentical) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const secret = this.config.getOrThrow<string>('SECRET_KEY');
    const accessToken = this._jwtService.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      { secret, expiresIn: ONE_HOUR_IN_SECONDS },
    );
    return {
      message: 'done',
      accessToken,
    };
  }
}
