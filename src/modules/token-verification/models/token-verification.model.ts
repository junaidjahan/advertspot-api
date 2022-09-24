import { UserModel } from 'src/modules/user/models/user.model';

export interface TokenVerificationModel {
  id?: string;
  Token: string;
  Type: string;
  UserId: string;
}
