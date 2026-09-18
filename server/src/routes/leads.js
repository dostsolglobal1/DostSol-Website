import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import Lead from '../models/Lead.js';
import Subscriber from '../models/Subscriber.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { asyncHandler } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireDB } from '../middleware/dbGuard.js';
import { sendMail, leadNotificationTemplate, leadAutoReplyTemplate } from '../utils/mailer.js';

const router = Router();

const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'RATE_LIMITED',
    message: 'Too many submissions. Please try again in a few minutes.',
  },
});

const leadSchema = z.object({
  name: z.string().min(2, 'Tell us your name.').max(120),
  email: z.string().email('That email address looks off.'),
  company: z.string().max(160).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  country: z.string().max(80).optional().or(z.literal('')),
  service: z.string().max(120).optional().or(z.literal('')),
  teamSize: z.string().max(60).optional().or(z.literal('')),
  budget: z.string().max(60).optional().or(z.literal('')),
  timeline: z.string().max(60).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(10, 'A sentence or two helps us route you correctly.').max(4000),
  source: z.string().max(60).optional(),
  // Honeypot — real users never fill this.
  website: z.string().max(0).optional().or(z.literal('')),
});

router.post(
  '/leads',
  writeLimiter,
  requireDB,
  validate(leadSchema),
  asyncHandler(async (req, res) => {
    const { website, ...payload } = req.body;
    if (website) {
      // Silently accept and discard bot submissions.
      return res.status(201).json({ ok: true, message: 'Received.' });
    }

    const lead = await Lead.create({
      ...payload,
      meta: {
        ip: req.ip,
        userAgent: req.get('user-agent'),
        referrer: req.get('referer'),
      },
    });

    await Promise.all([
      sendMail({
        to: process.env.MAIL_TO || 'info@dostsol.com',
        replyTo: lead.email,
        subject: `New enquiry — ${lead.company || lead.name}${lead.service ? ` · ${lead.service}` : ''}`,
        html: leadNotificationTemplate(lead),
        text: `${lead.name} <${lead.email}>\n\n${lead.message}`,
      }),
      sendMail({
        to: lead.email,
        subject: 'We received your enquiry — DostSol Global',
        html: leadAutoReplyTemplate(lead),
        text: `Thanks ${lead.name}. A strategist will reply within one business day.`,
      }),
    ]);

    res.status(201).json({
      ok: true,
      message: "Thanks — we'll reply within one business day.",
      data: { id: lead._id },
    });
  })
);

const subscribeSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  source: z.string().max(60).optional(),
});

router.post(
  '/subscribers',
  writeLimiter,
  requireDB,
  validate(subscribeSchema),
  asyncHandler(async (req, res) => {
    const { email, source } = req.body;
    await Subscriber.findOneAndUpdate(
      { email },
      { email, source: source || 'footer', active: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ ok: true, message: "You're on the list." });
  })
);

const applicationSchema = z.object({
  jobSlug: z.string().min(1),
  name: z.string().min(2, 'Tell us your name.').max(120),
  email: z.string().email('That email address looks off.'),
  phone: z.string().max(40).optional().or(z.literal('')),
  portfolio: z.string().max(300).optional().or(z.literal('')),
  resumeUrl: z.string().max(300).optional().or(z.literal('')),
  note: z.string().max(2000).optional().or(z.literal('')),
});

router.post(
  '/applications',
  writeLimiter,
  requireDB,
  validate(applicationSchema),
  asyncHandler(async (req, res) => {
    const { jobSlug, ...rest } = req.body;
    const job = await Job.findOne({ slug: jobSlug });
    if (!job) {
      res.status(404);
      throw new Error('That role is no longer open.');
    }

    await Application.create({ ...rest, job: job._id, jobTitle: job.title });

    await sendMail({
      to: process.env.MAIL_TO || 'info@dostsol.com',
      replyTo: rest.email,
      subject: `Application — ${job.title} — ${rest.name}`,
      text: `${rest.name} <${rest.email}>\nPortfolio: ${rest.portfolio || '—'}\nResume: ${rest.resumeUrl || '—'}\n\n${rest.note || ''}`,
    });

    res.status(201).json({ ok: true, message: 'Application received. We review every one.' });
  })
);

export default router;
