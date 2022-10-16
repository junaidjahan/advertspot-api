import { Socket } from 'socket.io';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

export type AnyObject = {
  [key: string]: any;
};

export type JwtPayload = {
  sub: string;
};

export type CurrentUser = Pick<
  UserDocument,
  'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'isEmailVerified' | 'role' | 'userTypes' | 'status'
>;

export type ConnectedSocket = {
  user: CurrentUser;
  socket: Socket;
};
