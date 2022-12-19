import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConversationDto {
  public id?: string | null = null;

  @IsDefined()
  @IsArray()
  public people: Array<string> | null = null; 

  @IsString()
  @IsOptional()
  public lastMessage: string | null = null;
}
