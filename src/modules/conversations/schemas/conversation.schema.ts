import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category,} from 'src/global';

export type ConversationDocument = Conversation & Document<string>;

@Schema({ timestamps: true})
export class Conversation {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  people: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'messages', default:null} )
  lastMessage: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
