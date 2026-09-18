import { Router } from 'express';
import Lead from '../models/Lead.js';
import Subscriber from '../models/Subscriber.js';
import Application from '../models/Application.js';
import Post from '../models/Post.js';
import { asyncHandler } from '../middleware/error.js';
import { protect, requireRole } from '../middleware/auth.js';
import { requireDB } from '../middleware/dbGuard.js';
import { slugify } from '../utils/slugify.js';

const router = Router();
router.use(requireDB, protect);

router.get(
  '/overview',
  asyncHandler(async (req, res) => {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [leads, leadsThisMonth, subscribers, applications, byStatus] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: since } }),
      Subscriber.countDocuments({ active: true }),
      Application.countDocuments(),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);

    res.json({
      ok: true,
      data: {
        leads,
        leadsThisMonth,
        subscribers,
        applications,
        byStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.count])),
      },
    });
  })
);

router.get(
  '/leads',
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 25);
    const filter = req.query.status ? { status: req.query.status } : {};

    const [data, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Lead.countDocuments(filter),
    ]);
    res.json({ ok: true, data, meta: { page, limit, total } });
  })
);

router.patch(
  '/leads/:id',
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found.');
    }
    res.json({ ok: true, data: lead });
  })
);

router.post(
  '/posts',
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const post = await Post.create({
      ...req.body,
      slug: req.body.slug || slugify(req.body.title),
    });
    res.status(201).json({ ok: true, data: post });
  })
);

router.patch(
  '/posts/:id',
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      res.status(404);
      throw new Error('Article not found.');
    }
    res.json({ ok: true, data: post });
  })
);

router.delete(
  '/posts/:id',
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: 'Deleted.' });
  })
);

export default router;
