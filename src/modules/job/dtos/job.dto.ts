import { IsDefined, IsEmail, IsNumber, IsString } from 'class-validator';
import { JobStatusType, ROLE, USER_TYPE } from 'src/globals';

export class JobDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public Title: string | null = null;

  @IsString()
  @IsDefined()
  public Type: string | null = null;

  @IsNumber()
  public Quantity: number | null = null;

  @IsString()
  public Dimensions: string | null = null;

  @IsDefined()
  @IsString()
  public Budget: string | null = null;

  public Status: JobStatusType | null = null;
  public UserId: string | null = null;

  public Description: string | null = null;
}
