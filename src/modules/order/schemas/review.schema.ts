import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category, Duration, Unit } from 'src/global';

export type ReviewDocument = Review & Document<string>;

@Schema()
export class Review {
  @Prop({ trim: true, required: true })
  orderId: string;

  @Prop({ trim: true, required: true })
  service: number;

  @Prop({ trim: true, required: true })
  communication: number;

  @Prop({ trim: true, required: true })
  delivery: number;

  @Prop({ trim: true, default: new Date(), required: false })
  createdAt: Date;

  @Prop({ trim: true, default: null, required: false })
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
