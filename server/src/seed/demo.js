/**
 * Demo data for evaluating the admin console.
 *
 * This is NOT part of `npm run seed` — it writes to the lead, subscriber and
 * application collections, which hold real enquiries in production. Everything it
 * creates is tagged `source: 'demo'` (or a @demo.dostsol.test address) so it can be
 * removed cleanly:
 *
 *   npm run seed:demo          add demo records
 *   npm run seed:demo -- --clear   remove them again
 */
import 'dotenv/config';
import mongoose from 'mongoose';

import Lead from '../models/Lead.js';
import Subscriber from '../models/Subscriber.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { services } from '../../../shared/services.js';

const DEMO_SOURCE = 'demo';
const DEMO_DOMAIN = '@demo.dostsol.test';
const DAY = 24 * 60 * 60 * 1000;

const FIRST = ['Sarah', 'Michael', 'Priya', 'Daniel', 'Elena', 'Marcus', 'Aisha', 'Tom', 'Grace', 'Victor', 'Nina', 'Rafael', 'Chloe', 'Omar', 'Helen'];
const LAST = ['Thompson', 'Chen', 'Raghavan', 'Okafor', 'Vargas', 'Bell', 'Khan', 'Wright', 'Mueller', 'Santos', 'Park', 'Dubois', 'Nolan', 'Haddad', 'Novak'];
const COMPANIES = ['Meridian Logistics', 'Northlake Digital', 'Cascade Property', 'Stackline Health', 'Okafor & Reed', 'Fieldwork Software', 'Brightpath Retail', 'Ironvale Construction', 'Latitude Finance', 'Rivermark Group', 'Halcyon Labs', 'Westbrook Partners'];
const BUDGETS = ['Under $5k / mo', '$5k–15k / mo', '$15k–40k / mo', '$40k+ / mo', 'Not sure yet'];
const SIZES = ['1–10', '11–50', '51–200', '201–1000', '1000+'];
const TIMELINES = ['Immediately', 'Within a month', 'This quarter', 'Exploring'];
const STATUSES = ['new', 'new', 'new', 'contacted', 'contacted', 'qualified', 'qualified', 'won', 'lost'];
const APP_STATUSES = ['received', 'received', 'screening', 'interview', 'offer', 'rejected'];

const MESSAGES = [
  'Our month-end close takes eleven days and two weekends. We need it under five without hiring another controller.',
  'We have been trying to hire two senior engineers for eight months. Considering an embedded offshore squad instead.',
  'Organic traffic has been flat for three quarters despite a content push. Looking for a technical audit first.',
  'Scaling from 40 to 120 people next year and our HR function is two people and a spreadsheet.',
  'We need procurement analysts who can actually work inside NetSuite rather than emailing us spreadsheets.',
  'Our design system exists only in one designer’s head and she is leaving in March.',
  'Three concurrent construction projects and no one owning the submittal log. It is costing us on change orders.',
  'Board wants a competitive teardown of four rivals before the March strategy offsite.',
  'Our helpdesk response time has slipped to two days and facilities complaints are escalating to me directly.',
  'We want to pilot one dedicated engineer for a quarter before committing to a full pod.',
];

const pick = (arr, i) => arr[i % arr.length];
const rand = (n) => Math.floor(Math.random() * n);

async function clear() {
  const [l, s, a] = await Promise.all([
    Lead.deleteMany({ source: DEMO_SOURCE }),
    Subscriber.deleteMany({ email: new RegExp(`${DEMO_DOMAIN}$`, 'i') }),
    Application.deleteMany({ email: new RegExp(`${DEMO_DOMAIN}$`, 'i') }),
  ]);
  console.log(`[demo] removed → ${l.deletedCount} leads · ${s.deletedCount} subscribers · ${a.deletedCount} applications`);
}

async function generate() {
  await clear(); // idempotent — re-running never doubles up

  const now = Date.now();
  const leads = [];

  // Spread across 75 days so the 7/30/90-day ranges each show something, with a
  // slight upward trend so the period-over-period delta is meaningful.
  for (let day = 74; day >= 0; day -= 1) {
    const recency = (75 - day) / 75;
    const perDay = Math.random() < 0.28 + recency * 0.4 ? 1 + rand(recency > 0.6 ? 3 : 2) : 0;

    for (let n = 0; n < perDay; n += 1) {
      const i = leads.length;
      const first = pick(FIRST, i + rand(3));
      const last = pick(LAST, i * 3 + rand(5));
      const created = new Date(now - day * DAY - rand(20) * 60 * 60 * 1000);

      leads.push({
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}${DEMO_DOMAIN}`,
        company: pick(COMPANIES, i + rand(4)),
        phone: `+1 555 0${100 + rand(899)}`,
        service: pick(services, i + rand(6)).title,
        teamSize: pick(SIZES, i + rand(3)),
        budget: pick(BUDGETS, i + rand(4)),
        timeline: pick(TIMELINES, i + rand(3)),
        message: pick(MESSAGES, i + rand(7)),
        source: DEMO_SOURCE,
        // Older leads have progressed further down the pipeline.
        status: day > 45 ? pick(STATUSES, i + 5) : day > 20 ? pick(STATUSES, i + 2) : 'new',
        createdAt: created,
        updatedAt: created,
      });
    }
  }

  const subscribers = Array.from({ length: 34 }, (_, i) => {
    const created = new Date(now - rand(80) * DAY);
    return {
      email: `subscriber${i + 1}${DEMO_DOMAIN}`,
      source: i % 4 === 0 ? 'insights' : 'footer',
      active: i % 11 !== 0,
      createdAt: created,
      updatedAt: created,
    };
  });

  const jobs = await Job.find().lean();
  const applications = jobs.length
    ? Array.from({ length: 16 }, (_, i) => {
        const job = pick(jobs, i + rand(jobs.length));
        const first = pick(FIRST, i * 2 + rand(4));
        const last = pick(LAST, i + rand(6));
        const created = new Date(now - rand(60) * DAY);
        return {
          job: job._id,
          jobTitle: job.title,
          name: `${first} ${last}`,
          email: `${first.toLowerCase()}.${last.toLowerCase()}.app${i}${DEMO_DOMAIN}`,
          phone: `+92 3${rand(90) + 10} ${rand(9000000) + 1000000}`,
          portfolio: i % 3 === 0 ? 'https://example.com/portfolio' : '',
          resumeUrl: i % 2 === 0 ? 'https://example.com/cv.pdf' : '',
          note: i % 4 === 0 ? 'Happy to walk through the migration project I led last year.' : '',
          status: pick(APP_STATUSES, i + rand(3)),
          createdAt: created,
          updatedAt: created,
        };
      })
    : [];

  // insertMany with timestamps disabled so our backdated createdAt values survive.
  const opts = { timestamps: false };
  const [l, s, a] = await Promise.all([
    Lead.insertMany(leads, opts),
    Subscriber.insertMany(subscribers, opts),
    applications.length ? Application.insertMany(applications, opts) : Promise.resolve([]),
  ]);

  console.log(`[demo] created → ${l.length} leads · ${s.length} subscribers · ${a.length} applications`);
  console.log('[demo] remove them any time with:  npm run seed:demo -- --clear');
}

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dostsol';
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log(`[demo] connected → ${mongoose.connection.name}`);

  if (process.argv.includes('--clear')) await clear();
  else await generate();

  await mongoose.connection.close();
}

run().catch((err) => {
  console.error(`[demo] failed: ${err.message}`);
  process.exit(1);
});
