import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, signupDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  signUp(@Body() body: signupDTO) {
    return this._authService.signup(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: loginDTO) {
    return this._authService.login(body);
  }
}
