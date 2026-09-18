import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: String,
    bio: String,
    avatar: String,
    initials: String,
    linkedin: String,
    email: String,
    focus: [String],
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamSchema);
