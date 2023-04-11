import { IsDefined, IsNumber, IsString } from 'class-validator';
import { JobStatus } from 'src/global';

export class JobDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public Title: string | null = null;

  @IsString()
  @IsDefined()
  public Type: string | null = null;

  @IsString()
  @IsDefined()
  public Delivery: string | null = null;

  @IsString()
  @IsDefined()
  public Duration: string | null = null;

  @IsString()
  @IsDefined()
  public Height: string | null = null;

  @IsString()
  @IsDefined()
  public Width: string | null = null;

  @IsString()
  @IsDefined()
  public Unit: string | null = null;

  @IsNumber()
  public Quantity: number | null = null;

  @IsDefined()
  @IsNumber()
  public Budget: number | null = null;

  @IsDefined()
  @IsString()
  public Location: string | null = null;

  public Status: JobStatus | null = null;

  public UserId: string | null = null;

  @IsString()
  public Description: string | null = null;

  public Proposals: string | null = null;
}
