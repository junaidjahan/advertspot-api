export class UserSessioDto {
  public id?: string | null = null;
  public FirstName: string | null = null;
  public LastName: string | null = null;
  public PhoneNumber: string | null = null;
  public UserType: string | null = null;
  public Email: string | null = null;
  public JwtToken: string | null = null;
  public Role: string | null = null;

  constructor(data: Partial<UserSessioDto>) {
    Object.assign(this, data);
  }
}
