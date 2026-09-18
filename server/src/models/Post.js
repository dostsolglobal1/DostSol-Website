import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: String,
    body: String, // markdown
    cover: String,
    category: { type: String, default: 'Insights', index: true },
    tags: [String],
    author: { name: String, role: String, avatar: String },
    readMinutes: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });

export default mongoose.model('Post', postSchema);
