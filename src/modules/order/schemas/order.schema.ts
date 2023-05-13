import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category, Duration, Unit } from 'src/global';

export type OrderDocument = Order & Document<string>;

@Schema()
export class Order {
  @Prop({ trim: true, required: true })
  sellerId: string;

  @Prop({ trim: true, required: true })
  buyerId: string;

  @Prop()
  status: string;

  @Prop({ trim: true, required: true })
  amount: string;

  @Prop({ trim: true })
  gigId: string;

  @Prop({ trim: true })
  jobId: string;

  @Prop({ trim: true, default: null, required: false })
  orderEndMonth: string;

  @Prop({ trim: true, default: new Date(), required: false })
  createdAt: Date;

  @Prop({ trim: true, default: null, required: false })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
