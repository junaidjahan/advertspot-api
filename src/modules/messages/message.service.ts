import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';
import { BaseService } from 'src/shared';
import { Message} from './schemas/message.schema';
import { MessageDto } from './dto/message.dto';
import console from 'console';

@Injectable()
export class MessagesService extends BaseService(Message) {
  pusher: Pusher;
  constructor() {
    super();
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

  async CreateMessage(data:MessageDto){
     try {
      // console.log(data);


      // let conversation = await ConversationModel.findById(data.roomID);
      // let receiver = conversation.people.filter((person) => person != user.id);
      // receiver = receiver[0];
      // let newMessage = await MessageModel.create({
      //   roomID: data.roomID,
      //   // sender: data.sender,
      //   sender: user.id,
      //   receiver: receiver,
      //   // receiver: data.receiver,
      //   message: data.message,
      // });

      let newMessage  = await this.model.create(data);

      let message = await this.model.findById(newMessage._id).populate([
        {
          path: 'sender',
          model: 'User',
          select: ['firstName', 'lastName', 'email']
        },
        {
          path: 'receiver',
          model: 'User',
          select: ['firstName', 'lastName', 'email']
        }
      ]);

      

      // if (newMessage) {
      //   let conversation = await ConversationModel.findByIdAndUpdate(
      //     data.roomID,
      //     {
      //       lastMessage: newMessage,
      //     }
      //   );


        this.trigger(
          `${data.conversationId}`,
          "message-received",
          message
        );
        return { data: message, message: 'created' };
      }
    catch (e) {
      throw e;
    }
  }

  async getMessages(conversationId:string){
    let messages = await this.model
      .find({
        conversationId: {
          $all: conversationId
        }
      })
      .populate({
        path: 'sender',
        model: 'User',
        select: ['firstName', 'lastName', 'email']
      }).populate({
        path: 'receiver',
        model: 'User',
        select: ['firstName', 'lastName', 'email']
      });

      return messages;
  }
}
