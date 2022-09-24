export class ResponseDto<T> {
  public status: boolean | null = null;
  public message: string | null = null;
  public data: T | null = null;

  constructor(data: Partial<ResponseDto<T>>) {
    Object.assign(this, data);
  }
}
