import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class signupDTO {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Equals('password', { message: 'Passwords not match cPassword' })
  cPassword: string;
}
