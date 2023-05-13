export class OrderByMonths {
  public Jan = 0;
  public Feb = 0;
  public Mar = 0;
  public Apr = 0;
  public May = 0;
  public Jun = 0;
  public Jul = 0;
  public Aug = 0;
  public Sep = 0;
  public Oct = 0;
  public Nov = 0;
  public Dec = 0;

  constructor(data?: Partial<OrderByMonths>) {
    Object.assign(this, data);
  }
}
