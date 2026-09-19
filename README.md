# DostSol Global — Premium

A MERN rebuild of [dostsol.com](https://dostsol.com) as a premium, conversion-focused
marketing and lead-generation platform.

- **M**ongoDB + Mongoose — services, posts, team, testimonials, jobs, leads, subscribers, applications
- **E**xpress — REST API with validation, rate limiting, JWT admin auth and transactional mail
- **R**eact 18 + Vite — token-driven design system, light/dark themes, route-level code splitting
- **N**ode 20+ — ESM throughout, npm workspaces

---

## Quick start

```bash
npm install                 # installs root, client and server workspaces
cp .env.example server/.env # then set JWT_SECRET (and SMTP, if you want real email)
npm run seed                # loads services, posts, team, testimonials, jobs + admin user
npm run seed:demo           # optional: sample leads/applications so the console has data
npm run dev                 # API on :5000, client on :5173
```

Site: <http://localhost:5173> · Console: <http://localhost:5173/admin>

Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Runs API and client together |
| `npm run dev:server` / `npm run dev:client` | Runs one side only |
| `npm run seed` | Wipes and reloads content collections (leads are never touched) |
| `npm run seed:demo` | Adds sample leads/subscribers/applications for evaluating the console |
| `npm run seed:demo -- --clear` | Removes every demo record again |
| `npm run build` | Production client build into `client/dist` |
| `npm start` | Serves API **and** the built client from `:5000` (set `NODE_ENV=production`) |

---

## Architecture

```
DostSol/
├─ shared/              Canonical content — the single source of truth
│  ├─ services.js         11 practices with capabilities, outcomes, FAQs
│  ├─ site.js             Company facts, nav, process, pricing, team, jobs, FAQs
│  └─ posts.js            Editorial articles (markdown bodies)
├─ server/
│  └─ src/
│     ├─ models/         8 Mongoose schemas
│     ├─ routes/         content · leads · auth · admin
│     ├─ middleware/     error · validate (zod) · auth (JWT) · dbGuard
│     ├─ utils/          mailer (nodemailer + templates) · slugify
│     └─ seed/           Seeds from shared/, creates the admin user
└─ client/
   └─ src/
      ├─ styles/         Design tokens + component layer
      ├─ components/     ui · Header (mega menu) · Footer · PageHero · Logo
      ├─ sections/       Hero · Stats · ServicesGrid · Process · Testimonials · CTA
      ├─ admin/          The console — auth, layout, charts, 5 pages
      ├─ pages/          12 routes
      ├─ hooks/          useContent (API + fallback) · useSeo · useCountUp
      └─ lib/            api (axios) · format (dates, markdown)
```

### Why `shared/`

The same content feeds the seeder **and** ships in the client bundle as a fallback.
`useContent` fetches from the API and only replaces the fallback on a successful
response — so if Mongo is down, the marketing site still renders completely. That
is a deliberate contract, not a convenience: a lead-generation site that shows an
empty page during a database blip is worse than one serving slightly stale content.

---

## Design system

Everything is driven by CSS custom properties in `client/src/styles/index.css`,
surfaced to Tailwind as semantic tokens (`bg-canvas`, `text-muted`, `border-line`,
`text-brand`). One component set renders both themes — there are no `dark:` variants
scattered through the markup.

The theme is applied before first paint by an inline script in `index.html`, so there
is no flash. It respects the OS preference until the visitor chooses explicitly.

| Token | Role |
| --- | --- |
| `canvas` / `surface` / `raised` | Page, card, and inset backgrounds |
| `ink` / `muted` / `faint` | Primary, secondary and tertiary text |
| `line` | All borders and dividers |
| `brand` · `gold` · `violet` · `teal` | Accent per practice, used consistently across cards, icons and detail pages |

**Type:** Plus Jakarta Sans (display) + Inter (body), with fluid `clamp()` scales.
**Motion:** one easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`) everywhere; all of it
disabled under `prefers-reduced-motion`.

### Accessibility

Skip link, visible focus rings on every interactive element, `aria-expanded` on all
disclosures, labelled form controls with `aria-invalid` and `aria-describedby` wired
to error text, `aria-pressed` on filter toggles, and decorative layers marked
`aria-hidden`. Body scroll locks behind the mobile drawer and Escape closes it.

---

## API

Base URL `/api`. Public reads need no auth.

| Method | Route | Notes |
| --- | --- | --- |
| `GET` | `/health` | Service + DB status |
| `GET` | `/services` `?featured=true` | List |
| `GET` | `/services/:slug` | Detail, with 3 related |
| `GET` | `/posts` `?page&limit&category&q` | Paginated, returns category facets |
| `GET` | `/posts/:slug` | Detail, with related |
| `GET` | `/team` · `/testimonials` · `/jobs` · `/jobs/:slug` | Lists and detail |
| `POST` | `/leads` | Contact form. Validated, rate limited, honeypot, emails both sides |
| `POST` | `/subscribers` | Newsletter (upsert, so re-subscribing is idempotent) |
| `POST` | `/applications` | Job application |
| `POST` | `/auth/login` → `GET /auth/me` | JWT |
| `GET` | `/admin/overview?days=7\|30\|90` | KPIs, period-over-period delta, daily series, status + practice breakdown |
| `GET` `PATCH` `DELETE` | `/admin/leads` · `/admin/leads/:id` | Search, filter, paginate, set status; delete is admin-only |
| `GET` | `/admin/leads-export` | RFC 4180 CSV of the current filter |
| `GET` `PATCH` | `/admin/applications` · `/:id` | Candidate pipeline |
| `GET` `PATCH` | `/admin/subscribers` · `/:id` | List and toggle active |
| `GET` `POST` `PATCH` `DELETE` | `/admin/posts` · `/:id` | Full CRUD; the GET returns drafts too; delete is admin-only |

**Error shape** is uniform, so forms never special-case the transport:

```json
{ "ok": false, "error": "VALIDATION", "message": "…", "fields": { "email": "…" } }
```

### Spam handling

Write routes are rate limited to 12 requests per 10 minutes per IP. The contact form
carries a hidden `website` honeypot; a filled one returns `201 { ok: true }` and
discards the submission silently. The zod schema deliberately *accepts* any value for
that field — rejecting it would tell a bot the field must be empty.

### Email

`utils/mailer.js` sends a notification to `MAIL_TO` and an auto-reply to the enquirer.
With no `SMTP_HOST` configured it logs both to the console instead, and it **never
throws** — an SMTP outage must not fail a lead capture.

---

## Admin console

Lives at `/admin`, behind JWT auth. It is a separate application shell — no marketing
header or footer, its own lazy-loaded chunk, so visitors never download it.

| Page | What it does |
| --- | --- |
| **Overview** | KPI tiles, daily leads chart, pipeline breakdown, enquiries by practice. 7/30/90-day range switch |
| **Leads** | Search, status filter, pagination, detail drawer, inline status changes, CSV export |
| **Applications** | Candidate pipeline with stage changes and links to CV/portfolio |
| **Subscribers** | List, toggle active, copy active addresses, CSV export |
| **Articles** | Full CRUD with a markdown editor, draft/publish toggle and auto-slug |

Deleting leads and articles is restricted to the `admin` role; `editor` can write and
publish but not destroy.

### Charts

Built per the data-visualisation method, not by eye:

- **Form first.** Daily lead counts are discrete events, so bars, not a line. KPIs are
  single figures with no plot, so stat tiles rather than one-bar charts.
- **Colour last, and computed.** The series hue is validated with the palette checker
  against this project's actual card surfaces — `#1d4ed8` on light, `#3987e5` on dark.
  The dark step is *selected* for the dark band, not an automatic flip of the light one.
- **Status colours are reserved** and never double as a series. Won/Lost use the fixed
  good/critical steps, which fail red-green CVD separation as a pair — so each ships
  with a distinct icon **and** a visible text label. Colour never carries meaning alone.
- Single series means no legend (the title names it), 2px gaps between bars, rounded
  ends anchored to the baseline, recessive gridlines, and hover tooltips with hit
  targets spanning the full column rather than just the bar.

Viz colours are Tailwind tokens (`text-viz-good`, `bg-viz-critical/10`) backed by RGB
triplets, so opacity modifiers resolve properly — `bg-[var(--x)]/10` on a raw CSS
variable silently produces invalid CSS.

### Demo data

`npm run seed:demo` generates ~75 leads spread over 75 days, plus subscribers and
applications, so the dashboard is evaluable before real traffic exists. Every record is
tagged `source: 'demo'` or uses an `@demo.dostsol.test` address, and
`npm run seed:demo -- --clear` removes them. It is deliberately **not** part of
`npm run seed`, because it writes to collections that hold real enquiries.

---

## Environment

Copy `.env.example` to `server/.env`.

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGO_URI` | yes | Defaults to `mongodb://127.0.0.1:27017/dostsol` |
| `JWT_SECRET` | yes | Long random string |
| `CLIENT_ORIGIN` | yes | Comma-separated allowed origins |
| `SMTP_*`, `MAIL_FROM`, `MAIL_TO` | no | Omit to log mail instead of sending |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | seed only | Change before any deploy |

In development the API boots even if Mongo is unreachable — data routes return a
clear `503` rather than hanging, and the client falls back to bundled content.

---

## Production

```bash
npm run build
NODE_ENV=production npm start
```

Express serves `client/dist` with an SPA fallback for non-`/api` routes.

Performance: the entry bundle is ~169 kB (58 kB gzipped) with React and Framer Motion
split into separately cacheable vendor chunks; every route past the homepage is lazy
loaded. Icons are imported through an explicit registry in `components/ui.jsx` — a
barrel `import * as Icons from 'lucide-react'` pulls the full icon set and cost 1 MB.

---

## Content changes

Edit the files in `shared/` and re-run `npm run seed`. That reloads the content
collections and leaves leads, subscribers and applications untouched. Blog posts can
alternatively be created through the protected `/api/admin/posts` endpoints.

## Not included

Resume uploads take a URL rather than a file, so there is no object storage or virus
scanning in the loop. The console has no user management screen — additional operators
are created by editing the seed or inserting directly. There is no audit log of who
changed which lead status. Analytics and a cookie consent banner are not wired up; the
privacy policy is written to match that (theme preference is the only thing stored in
the browser), so it would need revising if tracking is added.

The pricing bands, outcome percentages and bench headcounts are **illustrative** and
need replacing with real figures before this goes to production.
