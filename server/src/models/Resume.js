import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  originalFileName: String,
  filePath: String,
  extractedData: { type: mongoose.Schema.Types.Mixed },
  atsScore: { type: mongoose.Schema.Types.Mixed },
  rawText: String,
  status: { type: String, enum: ['pending', 'analyzing', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model('Resume', ResumeSchema);
export default Resume;
