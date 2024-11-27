import { AuthDbService } from './../../modules/auth/auth.db.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private _jwtService: JwtService,
    private readonly _AuthDbService: AuthDbService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization?.startsWith('abdrabo__')) {
      throw new BadRequestException('in-valid bearer key ');
    }
    const token = authorization.split('abdrabo__')[1];
    if (!token) {
      throw new BadRequestException('in-valid token ');
    }
    try {
      const decoded = this._jwtService.verify(token, { secret: 'abdrabo' });
      if (!decoded?.id) {
        throw new BadRequestException('in-valid token ');
      }
      const user = await this._AuthDbService.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('in-valid login account ');
      }
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        'roles',
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('un-authorized account');
      }
      request['user'] = user;
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }

    return true;
  }
}
