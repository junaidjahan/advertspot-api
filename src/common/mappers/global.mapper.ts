import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export const responseUser = ({
  Email,
  FirstName,
  LastName,
  PhoneNumber,
  UserType,
  id,
  IsEmailVerified,
  Role,
}: CreateUserDto | any) => {
  return {
    Email,
    FirstName,
    LastName,
    PhoneNumber,
    UserType,
    id,
    IsEmailVerified,
    Role,
  };
};
