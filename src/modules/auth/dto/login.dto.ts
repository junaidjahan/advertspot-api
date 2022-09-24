import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  Email: string;

  @IsDefined()
  @IsString()
  Password: string;
}
