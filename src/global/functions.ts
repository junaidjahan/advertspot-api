import { isEnum } from 'class-validator';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
import { serializeUser } from 'src/serializers';
import { CONNECTED_SOCKETS } from './constants';
import { UserType } from './enums';
import { SerializedUser } from './types';

export const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const unslugify = (text: string) => {
  return text.replace(/-/g, ' ').replace(/\w\S*/g, str => upperFirst(str));
};

export const titleize = (text: string) => {
  return unslugify(text)
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
};

/**
 *
 * @param authSrv Auth Service
 * @param socket Connected socket
 * @param type It will be `get` or `set`. `get` will not add user into connected socket, but `set` will
 * @returns `SerializedUser` instance
 */
export const getSocketUser = async (authSrv: AuthService, socket: Socket, type: 'get' | 'set' = 'set') => {
  const {
    handshake: {
      headers: { authorization, client }
    }
  } = socket;

  if (!authorization || authorization.length < 30) {
    throw new Error('Bearer token missing or malformed.');
  } else if (!client || !isEnum(client, UserType)) {
    throw new Error(`'client' is required in headers and must be "admin" or "customer".`);
  }

  const authToken = authorization.slice(7);
  const { sub: userId } = await authSrv.verifyAccessToken(authToken);

  const userClientKey = `${client}:${userId}`;

  const userSocket = CONNECTED_SOCKETS[userClientKey];

  if (type === 'get') {
    return userSocket?.user;
  }

  let user = userSocket?.user as SerializedUser | undefined;
  if (!user) {
    user = serializeUser(await authSrv.userService.model.findById(userId));
  }

  if (userSocket?.socket && userSocket.socket.id !== socket.id) {
    userSocket.socket.disconnect();
  }

  CONNECTED_SOCKETS[userClientKey] = {
    user,
    socket
  };

  socket.data._user = user;

  return user;
};
