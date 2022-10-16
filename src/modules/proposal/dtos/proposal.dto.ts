import { IsDefined, IsString } from 'class-validator';

export class ProposalDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public Amount: string | null = null;

  @IsString()
  public CoverLetter: string | null = null;

  @IsDefined()
  @IsString()
  public JobId: string | null = null;

  public UserId: string | null = null;
}
