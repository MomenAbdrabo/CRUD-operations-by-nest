import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDTO } from './validation/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}
  @Post('register')
  signUp(@Body() body: signupDTO) {
    return this._AuthService.signupService(body);
  }
}
