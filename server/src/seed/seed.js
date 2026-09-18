import 'dotenv/config';
import mongoose from 'mongoose';

import { services } from '../../../shared/services.js';
import { team, testimonials, jobs } from '../../../shared/site.js';
import { posts } from '../../../shared/posts.js';

import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import Post from '../models/Post.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dostsol';
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log(`[seed] connected → ${mongoose.connection.name}`);

  await Promise.all([
    Service.deleteMany({}),
    TeamMember.deleteMany({}),
    Testimonial.deleteMany({}),
    Post.deleteMany({}),
    Job.deleteMany({}),
  ]);

  const [svc, tm, ts, po, jb] = await Promise.all([
    Service.insertMany(services),
    TeamMember.insertMany(team),
    Testimonial.insertMany(testimonials),
    Post.insertMany(posts.map((p) => ({ ...p, publishedAt: new Date(p.publishedAt) }))),
    Job.insertMany(jobs),
  ]);

  // Admin user — created once, never overwritten.
  const email = (process.env.ADMIN_EMAIL || 'admin@dostsol.com').toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed] admin already exists → ${email}`);
  } else {
    await User.create({
      name: 'DostSol Admin',
      email,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    });
    console.log(`[seed] admin created → ${email}`);
  }

  console.log(
    `[seed] done: ${svc.length} services · ${tm.length} team · ${ts.length} testimonials · ${po.length} posts · ${jb.length} jobs`
  );
  await mongoose.connection.close();
}

run().catch((err) => {
  console.error(`[seed] failed: ${err.message}`);
  process.exit(1);
});
