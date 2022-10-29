import mongoose from 'mongoose';
import { JobStatus } from 'src/global';

export const JobSchema = new mongoose.Schema({
  Title: String,
  Quantity: Number,
  Dimensions: String,
  Budget: Number,
  Description: { type: String, default: null },
  Type: String,
  UserId: String,
  Status: { type: String, default: JobStatus.OPEN }
});
