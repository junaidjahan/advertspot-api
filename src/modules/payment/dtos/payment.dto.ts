import { IsDefined, IsString } from 'class-validator';

export class PaymentDto {
  @IsDefined()
  @IsString()
  public Currency: string | null = null;

  @IsDefined()
  @IsString()
  public Amount: string | null = null;
}
