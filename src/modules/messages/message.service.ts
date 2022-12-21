import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class MessagesService {
  pusher: Pusher;
  constructor() {
    this.pusher = new Pusher({
      appId: '1526980',
      key: '48573c6fb91ca49c9d45',
      secret: '7fb939602097ad2957e8',
      cluster: 'ap2',
      useTLS: true
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
