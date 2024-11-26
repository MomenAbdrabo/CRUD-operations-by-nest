import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userModel } from 'src/schemas/user.schema';
import { AuthDbService } from './auth.db.service';

@Module({
  imports: [userModel],
  controllers: [AuthController],
  providers: [AuthService, AuthDbService],
})
export class AuthModule {}
