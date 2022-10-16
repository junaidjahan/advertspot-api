import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { addDays } from 'date-fns';
import { Document } from 'mongoose';
import { EmailTemplate, VerificationTokenRelationType } from 'src/global';

export type VerificationTokenDocument = VerificationToken & Document;

@Schema()
export class VerificationToken {
  @Prop()
  token: string;

  @Prop({ default: addDays(new Date(), 1), type: Date })
  expires: Date;

  @Prop({ required: true, enum: EmailTemplate })
  type: string;

  @Prop({ required: true })
  relationId: string;

  @Prop({ required: true, enum: VerificationTokenRelationType })
  relationType: string;
}

export const VerificationTokenSchema = SchemaFactory.createForClass(VerificationToken);
