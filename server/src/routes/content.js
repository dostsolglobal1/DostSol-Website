import { Router } from 'express';
import Service from '../models/Service.js';
import Post from '../models/Post.js';
import Testimonial from '../models/Testimonial.js';
import TeamMember from '../models/TeamMember.js';
import Job from '../models/Job.js';
import { asyncHandler } from '../middleware/error.js';
import { requireDB } from '../middleware/dbGuard.js';

const router = Router();
router.use(requireDB);

/* ---------------------------------- services --------------------------------- */

router.get(
  '/services',
  asyncHandler(async (req, res) => {
    const filter = { published: true };
    if (req.query.featured === 'true') filter.featured = true;
    const services = await Service.find(filter).sort({ order: 1, title: 1 }).lean();
    res.json({ ok: true, count: services.length, data: services });
  })
);

router.get(
  '/services/:slug',
  asyncHandler(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug, published: true }).lean();
    if (!service) {
      res.status(404);
      throw new Error('Service not found.');
    }
    const related = await Service.find({ _id: { $ne: service._id }, published: true })
      .select('slug title summary icon accent')
      .limit(3)
      .lean();
    res.json({ ok: true, data: { ...service, related } });
  })
);

/* ----------------------------------- posts ----------------------------------- */

router.get(
  '/posts',
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(24, Number(req.query.limit) || 9);
    const filter = { published: true };

    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    if (req.query.q) filter.$text = { $search: req.query.q };

    const [items, total, categories] = await Promise.all([
      Post.find(filter)
        .sort({ featured: -1, publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter),
      Post.distinct('category', { published: true }),
    ]);

    res.json({
      ok: true,
      data: items,
      meta: { page, limit, total, pages: Math.ceil(total / limit) || 1, categories },
    });
  })
);

router.get(
  '/posts/:slug',
  asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug, published: true }).lean();
    if (!post) {
      res.status(404);
      throw new Error('Article not found.');
    }
    const related = await Post.find({
      _id: { $ne: post._id },
      published: true,
      category: post.category,
    })
      .select('slug title excerpt category readMinutes publishedAt cover')
      .limit(3)
      .lean();
    res.json({ ok: true, data: { ...post, related } });
  })
);

/* ------------------------------ team / social proof --------------------------- */

router.get(
  '/team',
  asyncHandler(async (req, res) => {
    const team = await TeamMember.find({ published: true }).sort({ order: 1 }).lean();
    res.json({ ok: true, count: team.length, data: team });
  })
);

router.get(
  '/testimonials',
  asyncHandler(async (req, res) => {
    const items = await Testimonial.find({ published: true }).sort({ order: 1 }).lean();
    res.json({ ok: true, count: items.length, data: items });
  })
);

/* ------------------------------------ jobs ------------------------------------ */

router.get(
  '/jobs',
  asyncHandler(async (req, res) => {
    const jobs = await Job.find({ published: true }).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, count: jobs.length, data: jobs });
  })
);

router.get(
  '/jobs/:slug',
  asyncHandler(async (req, res) => {
    const job = await Job.findOne({ slug: req.params.slug, published: true }).lean();
    if (!job) {
      res.status(404);
      throw new Error('Role not found.');
    }
    res.json({ ok: true, data: job });
  })
);

export default router;
