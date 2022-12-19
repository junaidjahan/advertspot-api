// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { Category,} from 'src/global';

// export type ConversationDocument = Conversation & Document<string>;

// @Schema({ timestamps: true})
// export class Conversation {
//   @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'users' }] })
//   people: Array<string>;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages',default:null}] })
//   lastMessages: string;
// }

// export const ConversationSchema = SchemaFactory.createForClass(Conversation);
