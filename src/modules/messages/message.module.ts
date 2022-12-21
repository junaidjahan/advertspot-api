import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])]
})
export class MessagesModule {}
