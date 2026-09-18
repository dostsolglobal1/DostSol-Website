import mongoose from 'mongoose';

const capabilitySchema = new mongoose.Schema(
  { title: String, description: String },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    tagline: String,
    summary: String,
    icon: { type: String, default: 'Sparkles' },
    accent: { type: String, default: 'brand' }, // brand | violet | gold | teal
    heroHeadline: String,
    heroSub: String,
    capabilities: [capabilitySchema],
    outcomes: [{ label: String, value: String }],
    deliverables: [String],
    faqs: [{ q: String, a: String }],
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
