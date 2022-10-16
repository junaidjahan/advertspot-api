import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CONNECTION_EVENT, DISCONNECT_EVENT } from '@nestjs/websockets/constants';
import { Server, Socket } from 'socket.io';
import { CONNECTED_SOCKETS, getSocketUser } from './global';
import { AuthService } from './modules/auth/auth.service';

export class WsAdapter extends IoAdapter {
  constructor(private app: INestApplication) {
    super(app);
  }

  bindClientConnect(server: Server, listener: (socket: Socket) => void) {
    server
      .use(async (client, next) => {
        try {
          await getSocketUser(this.app.get(AuthService), client);
          next();
        } catch ({ message }) {
          next(new Error(message as string));
        }
      })
      .on(CONNECTION_EVENT, listener);
  }

  bindClientDisconnect(socket: Socket, listener: (reason: string) => void) {
    const {
      handshake: {
        headers: { client }
      }
    } = socket;

    socket.on(DISCONNECT_EVENT, reason => {
      delete CONNECTED_SOCKETS[`${client}:${socket.data._user.Id}`];

      listener(reason);
    });
  }
}
