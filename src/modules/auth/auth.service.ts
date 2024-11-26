import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDbService } from './auth.db.service';
import { signupDTO } from './validation/auth.dto';

@Injectable()
export class AuthService {
  constructor(private _AuthDbService: AuthDbService) {}

  async signupService(
    body: signupDTO,
  ): Promise<{ message: string; user: any }> {
    const checkEmil = await this._AuthDbService.findOne(body.email);
    if (checkEmil) {
      throw new BadRequestException('Email exist');
    }
    const user = await this._AuthDbService.createUser(body);
    return {
      message: 'welcome',
      user,
    };
  }
}
