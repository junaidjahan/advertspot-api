import mongoose from 'mongoose';
import { UserSchema } from 'src/modules/user/schemas/user.schema';

export const TokenVerificationSchema = new mongoose.Schema({
  Token: String,
  Type: String,
  UserId: String
});
