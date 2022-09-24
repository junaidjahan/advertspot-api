import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ROLE, USER_TYPE } from 'src/globals';

export class CreateUserDto {
  public id?: string | null = null;
  @IsString()
  public FirstName: string | null = null;
  @IsString()
  public LastName: string | null = null;
  public PhoneNumber: string | null = null;
  public IsEmailVerified: boolean | null = false;
  @IsDefined()
  @IsString()
  public UserType: string | null = null;
  public Role: string | null = null;
  @IsDefined()
  @IsEmail()
  public Email: string | null = null;

  @IsDefined()
  @IsString()
  public Password: string | null = null;
}
