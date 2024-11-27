import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, signupDTO } from './validation/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}
  @Post('register')
  signUp(@Body() body: signupDTO) {
    return this._AuthService.signupService(body);
  }
  @Post('login')
  @HttpCode(200)
  login(@Body() body: loginDTO) {
    return this._AuthService.loginService(body);
  }
}
