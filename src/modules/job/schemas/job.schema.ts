import mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  Title: String,
  Quantity: Number,
  Dimensions: String,
  Budget: String,
  Description: String,
  Type: String,
  UserId: String,
});
