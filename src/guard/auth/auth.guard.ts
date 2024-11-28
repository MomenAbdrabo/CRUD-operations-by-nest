import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/auth/models';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private _jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectModel(User.name) private User: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const bearer = this.config.get<string>('BEARER_KEY');
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization?.startsWith(bearer)) {
      throw new BadRequestException('in-valid bearer key ');
    }
    const token = authorization.replace(bearer)[1];
    if (!token) {
      throw new UnauthorizedException('not authorized');
    }
    try {
      const decoded = this._jwtService.verify(token, {
        secret: this.config.get<string>('SECRET_KEY'),
      });
      if (!decoded?.id) {
        throw new UnauthorizedException('not authorized');
      }
      const user = await this.User.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('not authorized');
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
