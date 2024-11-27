import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDbService } from './auth.db.service';
import { loginDTO, signupDTO } from './validation/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _AuthDbService: AuthDbService,
    private _jwtService: JwtService,
  ) {}
  //===================== signup =================//
  async signupService(
    body: signupDTO,
  ): Promise<{ message: string; user: any }> {
    const checkEmil = await this._AuthDbService.findOne(body.email);
    if (checkEmil) {
      throw new ConflictException('Email already exists');
    }
    const user = await this._AuthDbService.createUser(body);
    return {
      message: 'welcome',
      user,
    };
  }
  //=================== login ===============//
  async loginService(
    body: loginDTO,
  ): Promise<{ message: string; accessToken: string }> {
    const { email, password } = body;
    //====================== check user ==============//
    const user = await this._AuthDbService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found please signup first ');
    }
    //==================== verifyPassword ==================//
    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException('in-valid login data');
    }
    //===================== token ======================//
    const accessToken = this._jwtService.sign(
      {
        id: user['_id'],
        role: user.role,
      },
      { secret: 'abdrabo', expiresIn: 60 * 60 },
    );
    return {
      message: 'done',
      accessToken,
    };
  }
}
