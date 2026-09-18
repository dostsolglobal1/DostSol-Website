import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    company: String,
    phone: String,
    country: String,
    service: String,
    teamSize: String,
    budget: String,
    timeline: String,
    subject: String,
    message: { type: String, required: true },
    source: { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'won', 'lost'],
      default: 'new',
      index: true,
    },
    meta: {
      ip: String,
      userAgent: String,
      referrer: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
