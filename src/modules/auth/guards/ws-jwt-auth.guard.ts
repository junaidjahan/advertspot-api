import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { getSocketUser } from 'src/global';
import { AuthService } from '../auth.service';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private authSrv: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const socket: Socket = context.switchToWs().getClient();
    const user = await getSocketUser(this.authSrv, socket, 'get');

    if (typeof context.switchToWs().getData() !== 'object') {
      throw new BadRequestException('You must send JSON data, not string or number.');
    }

    context.switchToWs().getData()._user = user;

    return true;
  }
}
