import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    jobTitle: String,
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: String,
    portfolio: String,
    resumeUrl: String,
    note: String,
    status: {
      type: String,
      enum: ['received', 'screening', 'interview', 'offer', 'rejected'],
      default: 'received',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
