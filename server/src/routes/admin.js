import { Router } from 'express';
import Lead from '../models/Lead.js';
import Subscriber from '../models/Subscriber.js';
import Application from '../models/Application.js';
import Post from '../models/Post.js';
import TeamMember from '../models/TeamMember.js';
import { asyncHandler } from '../middleware/error.js';
import { protect, requireRole } from '../middleware/auth.js';
import { requireDB } from '../middleware/dbGuard.js';
import { slugify } from '../utils/slugify.js';

const router = Router();
router.use(requireDB, protect);

const DAY = 24 * 60 * 60 * 1000;

/** Local-date key (YYYY-MM-DD) so buckets line up with the viewer's calendar. */
const dayKey = (d) => d.toISOString().slice(0, 10);

/* --------------------------------------------------------------- overview -- */

router.get(
  '/overview',
  asyncHandler(async (req, res) => {
    const days = Math.min(90, Math.max(7, Number(req.query.days) || 30));
    const since = new Date(Date.now() - (days - 1) * DAY);
    since.setHours(0, 0, 0, 0);
    const prevSince = new Date(since.getTime() - days * DAY);

    const [
      leads,
      leadsInRange,
      leadsPrevRange,
      subscribers,
      subsInRange,
      applications,
      appsInRange,
      posts,
      byStatus,
      byService,
      daily,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: since } }),
      Lead.countDocuments({ createdAt: { $gte: prevSince, $lt: since } }),
      Subscriber.countDocuments({ active: true }),
      Subscriber.countDocuments({ active: true, createdAt: { $gte: since } }),
      Application.countDocuments(),
      Application.countDocuments({ createdAt: { $gte: since } }),
      Post.countDocuments({ published: true }),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Lead.aggregate([
        { $match: { service: { $nin: [null, ''] } } },
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Fill every day in the window so the chart has no implicit gaps.
    const counts = Object.fromEntries(daily.map((d) => [d._id, d.count]));
    const series = Array.from({ length: days }, (_, i) => {
      const date = new Date(since.getTime() + i * DAY);
      const key = dayKey(date);
      return { date: key, count: counts[key] || 0 };
    });

    const statusMap = Object.fromEntries(byStatus.map((s) => [s._id, s.count]));

    res.json({
      ok: true,
      data: {
        days,
        totals: { leads, subscribers, applications, posts },
        range: {
          leads: leadsInRange,
          subscribers: subsInRange,
          applications: appsInRange,
        },
        // Null rather than a fabricated 0% when there is no prior period to compare.
        delta: {
          leads: leadsPrevRange === 0 ? null : Math.round(((leadsInRange - leadsPrevRange) / leadsPrevRange) * 100),
          previous: leadsPrevRange,
        },
        byStatus: statusMap,
        byService: byService.map((s) => ({ service: s._id, count: s.count })),
        series,
      },
    });
  })
);

/* ------------------------------------------------------------------ leads -- */

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];

router.get(
  '/leads',
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 25);

    const filter = {};
    if (req.query.status && LEAD_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }
    if (req.query.q) {
      const rx = new RegExp(req.query.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { email: rx }, { company: rx }, { message: rx }];
    }

    const [data, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Lead.countDocuments(filter),
    ]);

    res.json({
      ok: true,
      data,
      meta: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
    });
  })
);

router.patch(
  '/leads/:id',
  asyncHandler(async (req, res) => {
    if (!LEAD_STATUSES.includes(req.body.status)) {
      res.status(400);
      throw new Error(`Status must be one of: ${LEAD_STATUSES.join(', ')}.`);
    }
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

router.delete(
  '/leads/:id',
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found.');
    }
    res.json({ ok: true, message: 'Lead deleted.' });
  })
);

/** CSV export of the current filter, for handing to a CRM. */
router.get(
  '/leads-export',
  asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.status && LEAD_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(5000).lean();

    const cols = ['createdAt', 'name', 'email', 'company', 'phone', 'service', 'budget', 'timeline', 'status', 'message'];
    // Escape per RFC 4180 — quotes doubled, field wrapped.
    const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [
      cols.join(','),
      ...leads.map((l) => cols.map((c) => cell(l[c])).join(',')),
    ].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="dostsol-leads-${dayKey(new Date())}.csv"`);
    res.send(csv);
  })
);

/* ----------------------------------------------------------- applications -- */

const APP_STATUSES = ['received', 'screening', 'interview', 'offer', 'rejected'];

router.get(
  '/applications',
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 25);
    const filter = {};
    if (req.query.status && APP_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }

    const [data, total] = await Promise.all([
      Application.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Application.countDocuments(filter),
    ]);

    res.json({ ok: true, data, meta: { page, limit, total, pages: Math.ceil(total / limit) || 1 } });
  })
);

router.patch(
  '/applications/:id',
  asyncHandler(async (req, res) => {
    if (!APP_STATUSES.includes(req.body.status)) {
      res.status(400);
      throw new Error(`Status must be one of: ${APP_STATUSES.join(', ')}.`);
    }
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!app) {
      res.status(404);
      throw new Error('Application not found.');
    }
    res.json({ ok: true, data: app });
  })
);

/* ------------------------------------------------------------ subscribers -- */

router.get(
  '/subscribers',
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Number(req.query.limit) || 50);

    const [data, total] = await Promise.all([
      Subscriber.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Subscriber.countDocuments(),
    ]);

    res.json({ ok: true, data, meta: { page, limit, total, pages: Math.ceil(total / limit) || 1 } });
  })
);

router.patch(
  '/subscribers/:id',
  asyncHandler(async (req, res) => {
    const sub = await Subscriber.findByIdAndUpdate(
      req.params.id,
      { active: Boolean(req.body.active) },
      { new: true }
    );
    if (!sub) {
      res.status(404);
      throw new Error('Subscriber not found.');
    }
    res.json({ ok: true, data: sub });
  })
);

/* ------------------------------------------------------------------ posts -- */

router.get(
  '/posts',
  asyncHandler(async (req, res) => {
    // Unlike the public route this returns drafts too.
    const data = await Post.find().sort({ publishedAt: -1 }).lean();
    res.json({ ok: true, count: data.length, data });
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
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Article not found.');
    }
    res.json({ ok: true, message: 'Deleted.' });
  })
);

/* ------------------------------------------------------------------- team -- */

const TEAM_STRINGS = ['name', 'role', 'bio', 'avatar', 'initials', 'linkedin', 'email'];

/**
 * Only the fields the editor owns, coerced to the shapes the schema expects —
 * a form posts `focus` as a string and `order` as text.
 */
function teamFields(body = {}) {
  const out = {};
  for (const key of TEAM_STRINGS) {
    if (body[key] !== undefined) out[key] = String(body[key] ?? '').trim();
  }
  if (body.focus !== undefined) {
    const raw = Array.isArray(body.focus) ? body.focus : String(body.focus).split(',');
    out.focus = raw.map((f) => String(f).trim()).filter(Boolean);
  }
  if (body.order !== undefined) out.order = Number(body.order) || 0;
  if (body.published !== undefined) out.published = Boolean(body.published);
  return out;
}

router.get(
  '/team',
  asyncHandler(async (req, res) => {
    // Unlike the public route this returns unpublished members too.
    const data = await TeamMember.find().sort({ order: 1, name: 1 }).lean();
    res.json({ ok: true, count: data.length, data });
  })
);

router.post(
  '/team',
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const fields = teamFields(req.body);
    if (!fields.name) {
      res.status(400);
      throw new Error('A team member needs a name.');
    }
    // New members land at the end of the team page rather than silently at the top.
    if (req.body.order === undefined) {
      const last = await TeamMember.findOne().sort({ order: -1 }).select('order').lean();
      fields.order = (last?.order ?? 0) + 1;
    }
    const member = await TeamMember.create(fields);
    res.status(201).json({ ok: true, data: member });
  })
);

/**
 * Persists the display order in one write. The client sends the full id list in
 * its new order, so a reshuffle can never leave two members sharing a rank.
 */
router.patch(
  '/team/reorder',
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const ids = Array.isArray(req.body.ids) ? req.body.ids : null;
    if (!ids?.length) {
      res.status(400);
      throw new Error('Send the ordered list of member ids.');
    }
    await TeamMember.bulkWrite(
      ids.map((id, i) => ({
        updateOne: { filter: { _id: id }, update: { $set: { order: i + 1 } } },
      }))
    );
    const data = await TeamMember.find().sort({ order: 1, name: 1 }).lean();
    res.json({ ok: true, data });
  })
);

router.patch(
  '/team/:id',
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, teamFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!member) {
      res.status(404);
      throw new Error('Team member not found.');
    }
    res.json({ ok: true, data: member });
  })
);

router.delete(
  '/team/:id',
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404);
      throw new Error('Team member not found.');
    }
    res.json({ ok: true, message: 'Deleted.' });
  })
);

export default router;
