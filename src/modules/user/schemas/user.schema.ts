import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, UserStatus, UserType } from 'src/global';

export type UserDocument = User & Document;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
