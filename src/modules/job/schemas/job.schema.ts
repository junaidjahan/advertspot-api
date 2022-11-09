import mongoose from 'mongoose';
import { JobStatus } from 'src/global';

export const JobSchema = new mongoose.Schema({
  Title: String,
  Quantity: Number,
  Dimensions: String,
  Budget: Number,
  Location: String,
  Description: String,
  Type: String,
  UserId: String,
  Status: { type: String, default: JobStatus.OPEN },
  Proposals: { type: Number, default: 0 }
});
