import mongoose from 'mongoose';

const businessDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['financial', 'sentiment', 'marketing'], required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Parsed JSON data
  fileName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const BusinessData = mongoose.model('BusinessData', businessDataSchema);
