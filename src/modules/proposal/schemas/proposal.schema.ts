import mongoose from 'mongoose';
import { JobStatusType } from 'src/globals';

export const ProposalSchema = new mongoose.Schema({
  Amount: String,
  CoverLetter: { type: String, default: null },
  JobId: String,
  UserId: String
});
