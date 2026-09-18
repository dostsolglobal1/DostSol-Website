import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: String,
    company: String,
    avatar: String,
    quote: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    service: String,
    metric: { label: String, value: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
