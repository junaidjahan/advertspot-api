import { IsDefined, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsPhone } from 'src/decorators';
import { UserType } from 'src/global';

export class SignupDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  phone: string;

  @IsEnum(UserType)
  userType: string;

  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
