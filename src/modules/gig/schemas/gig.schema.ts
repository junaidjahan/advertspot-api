import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category, Role, UserStatus, UserType } from 'src/global';

export type GigDocument = Gig & Document<string>;

@Schema()
export class Gig {
  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true, required: true })
  price: string;

  @Prop()
  description: string;

  @Prop({ trim: true, required: true })
  quantity: string;

  @Prop({ required: true })
  delivery: string;

  @Prop()
  dimensions: string;

  @Prop({ required: true })
  sellerId: string;

  @Prop({ type: [String] })
  images: Array<string>;

  @Prop({ required: true, enum: Category })
  category: Category;
}

export const GigSchema = SchemaFactory.createForClass(Gig);
