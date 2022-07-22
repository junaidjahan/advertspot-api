import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  PhoneNumber: Number,
  UserType: String,
  Email: String,
  Password: String,
});
