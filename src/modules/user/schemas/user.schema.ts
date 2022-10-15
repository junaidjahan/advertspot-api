import mongoose from 'mongoose';
import { ROLE } from 'src/globals';

export const UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  PhoneNumber: { type: Number, default: null },
  UserType: String,
  Email: String,
  Password: String,
  Role: { type: String, default: ROLE.USER },
  IsEmailVerified: { type: Boolean, default: false }
});
