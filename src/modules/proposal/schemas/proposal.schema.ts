import mongoose from 'mongoose';

export const ProposalSchema = new mongoose.Schema({
  Amount: String,
  CoverLetter: { type: String, default: null },
  JobId: String,
  UserId: String
});
