import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
  @IsString()
  @IsOptional()
  role?: string;
}
export class loginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
