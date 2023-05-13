export default class OrdersModel {
  public id?: string | null = null;
  public title: string | null = null;
  public status: string | null = null;
  public description: string | null = null;
  public height: string | null = null;
  public width: string | null = null;
  public quantity: string | null = null;
  public amount: string | null = null;
  public proposals: string | null = null;
  public userType: string | null = null;
  public orderEndMonth: string | null = null;

  constructor(data?: Partial<OrdersModel>) {
    Object.assign(this, data);
  }
}
