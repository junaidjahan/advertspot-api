import { IsDefined, IsOptional, IsString } from 'class-validator';

export class OrderDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public sellerId: string | null = null;

  @IsString()
  @IsDefined()
  public buyerId: string | null = null;

  @IsOptional()
  @IsString()
  public status: string | null = null;

  @IsDefined()
  @IsString()
  public amount: string | null = null;

  @IsString()
  public gigId: string | null = null;

  @IsString()
  public jobId: string | null = null;
}
