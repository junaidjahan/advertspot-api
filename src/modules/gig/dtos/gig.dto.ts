import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/global';

export class GigDto {
  public id?: string | null = null;

  @IsDefined()
  @IsString()
  public title: string | null = null;

  @IsString()
  @IsDefined()
  public price: string | null = null;

  @IsOptional()
  @IsString()
  public description: string | null = null;

  @IsString()
  public quantity: string | null = null;

  @IsDefined()
  @IsString()
  public delivery: string | null = null;

  @IsOptional()
  @IsString()
  public dimensions: string | null = null;

  @IsOptional()
  @IsString()
  public sellerId: string | null = null;

  @IsOptional()
  @IsArray()
  public images: Array<string> | null = null;

  @IsEnum(Category)
  category: string;
}
