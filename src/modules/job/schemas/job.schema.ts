import mongoose from 'mongoose';
import { JobStatusType } from 'src/globals';

export const JobSchema = new mongoose.Schema({
  Title: String,
  Quantity: Number,
  Dimensions: String,
  Budget: String,
  Description: { type: String, default: null },
  Type: String,
  UserId: String,
  Status: { type: String, default: JobStatusType.OPEN },
});
