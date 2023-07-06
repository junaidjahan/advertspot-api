import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, UserStatus, UserType } from 'src/global';

export type UserDocument = User & Document<string>;

@Schema()
export class User {
  @Prop({ trim: true, required: true })
  firstName: string;

  @Prop({ trim: true, required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({ required: true, type: [String], enum: UserType })
  userTypes: Array<UserType>;

  @Prop({ required: true, enum: UserStatus })
  status: UserStatus;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: {overallRating:0, totalRated:0}, default:{overallRating:0, totalRated:0}})
  rating: {overallRating:number, totalRated:number};
}

export const UserSchema = SchemaFactory.createForClass(User);
