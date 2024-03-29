import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category, Duration, Role, Unit, UserStatus, UserType } from 'src/global';

export type GigDocument = Gig & Document<string>;

@Schema()
export class Gig {
  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  price: string;

  @Prop()
  description: string;

  @Prop({ trim: true })
  quantity: string;

  @Prop({ trim: true })
  delivery: string;

  @Prop({ trim:true })
  duration: string;

  @Prop({ trim:true })
  unit: string;

  @Prop()
  height: string;

  @Prop()
  width: string;

  @Prop({ required: true })
  sellerId: string;

  @Prop({ type: [String] })
  images: Array<string>;

  @Prop({ required: true, enum: Category })
  category: Category;
}

export const GigSchema = SchemaFactory.createForClass(Gig);
