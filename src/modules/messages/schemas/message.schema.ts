import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category,} from 'src/global';

export type MessageDocument = Message & Document<string>;

@Schema({ timestamps: true })
export class Message {
  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'conversations',default:null  })
  conversationId: string;
  @Prop()
  message: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null } )
  sender: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null } )
  receiver: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
