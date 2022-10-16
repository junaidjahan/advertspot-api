import { CurrentUser } from 'src/global';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

export const serializeUser = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  isEmailVerified,
  role,
  userTypes,
  status
}: UserDocument): CurrentUser => ({
  id,
  firstName,
  lastName,
  email,
  phone,
  isEmailVerified,
  role,
  userTypes,
  status
});
