import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public orderId: string | null = null;

  @IsDefined()
  @IsNumber()
  public service: number | null = null;

  @IsDefined()
  @IsNumber()
  public communication : number | null = null;

  @IsDefined()
  @IsNumber()
  public delivery: string | null = null;
}
