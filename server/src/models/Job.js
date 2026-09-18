import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    department: String,
    location: { type: String, default: 'Lahore, PK' },
    type: { type: String, default: 'Full-time' },
    level: String,
    summary: String,
    responsibilities: [String],
    requirements: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
