import { IsDefined, IsNumber, IsString } from 'class-validator';
import { AnyObject, JobStatus } from 'src/global';

export class CitiesDto {
  public id?: string | null = null;

  @IsString()
  public cities: Array<AnyObject> | null = null;
}
