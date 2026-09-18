/**
 * Canonical service catalogue.
 * Imported by the API seeder and used by the client as offline fallback content.
 */
export const services = [
  {
    slug: 'information-technology',
    title: 'Information Technology',
    tagline: 'Engineering teams that ship',
    icon: 'Code2',
    accent: 'brand',
    featured: true,
    order: 1,
    summary:
      'Dedicated engineers, architects and QA embedded in your sprints — building the software your roadmap has been waiting on.',
    heroHeadline: 'Engineering capacity, without the 90-day hiring cycle',
    heroSub:
      'We assemble product-ready squads — engineers, architects, QA and DevOps — who work in your tooling, your rituals and your timezone overlap.',
    capabilities: [
      { title: 'Custom software development', description: 'Web, mobile and internal platforms built to your architecture standards, not ours.' },
      { title: 'Cloud & DevOps', description: 'AWS, Azure and GCP infrastructure as code, CI/CD pipelines and observability you can actually read.' },
      { title: 'Application maintenance', description: 'Tiered support, SLA-backed incident response and a documented runbook from day one.' },
      { title: 'QA & test automation', description: 'Regression suites, performance testing and release gates that stop bugs reaching production.' },
      { title: 'Data engineering', description: 'Pipelines, warehousing and reporting layers that turn scattered systems into one source of truth.' },
      { title: 'Legacy modernisation', description: 'Incremental migration off ageing stacks — with a rollback plan at every step.' },
    ],
    outcomes: [
      { label: 'Time to first commit', value: '14 days' },
      { label: 'Cost vs. US in-house', value: '-58%' },
      { label: 'Engineer retention', value: '94%' },
    ],
    deliverables: [
      'Named squad with a dedicated technical lead',
      'Sprint cadence aligned to your calendar',
      'Weekly demo plus written progress report',
      'Source code and IP assigned to you in full',
    ],
    faqs: [
      {
        q: 'How much timezone overlap do we get?',
        a: 'Standard engagements include four to six hours of overlap with US business hours. Full-shift US coverage is available on request.',
      },
      {
        q: 'Who owns the intellectual property?',
        a: 'You do, entirely. IP assignment is executed before the first line of code is written.',
      },
      {
        q: 'Can we start with one engineer?',
        a: 'Yes. Most clients start with a single senior engineer or a two-person pod, then scale once the working rhythm is proven.',
      },
    ],
  },
  {
    slug: 'accounting-finance',
    title: 'Accounting & Finance',
    tagline: 'Books closed, on time, every time',
    icon: 'Calculator',
    accent: 'gold',
    featured: true,
    order: 2,
    summary:
      'Bookkeeping, payroll, tax preparation and controller-level reporting handled by qualified accountants who know US GAAP.',
    heroHeadline: 'A finance function that scales before your headcount does',
    heroSub:
      'From daily bookkeeping to month-end close and CFO-grade reporting, staffed by ACCA and CPA-track accountants working inside your ledger.',
    capabilities: [
      { title: 'Bookkeeping & reconciliation', description: 'Daily transaction coding, bank and credit card reconciliation in QuickBooks, Xero or NetSuite.' },
      { title: 'Month-end close', description: 'A documented close checklist that lands your numbers within five business days.' },
      { title: 'Payroll processing', description: 'Multi-state payroll runs, filings and year-end forms, coordinated with your provider.' },
      { title: 'Tax preparation support', description: 'Workpaper preparation and schedule builds that let your CPA file faster and cheaper.' },
      { title: 'AP / AR management', description: 'Invoice capture, approval routing, collections follow-up and ageing reports.' },
      { title: 'Management reporting', description: 'Board-ready P&L, cash flow and KPI packs delivered on a fixed calendar.' },
    ],
    outcomes: [
      { label: 'Average close time', value: '5 days' },
      { label: 'Cost reduction', value: '-60%' },
      { label: 'Reconciliation accuracy', value: '99.8%' },
    ],
    deliverables: [
      'Documented close calendar and checklist',
      'Standardised chart of accounts review',
      'Monthly reporting pack in your format',
      'Audit-ready workpaper trail',
    ],
    faqs: [
      {
        q: 'Do you work in our accounting system?',
        a: 'Yes. We operate inside your instance of QuickBooks, Xero, NetSuite or Sage, so you keep full ownership and visibility.',
      },
      {
        q: 'How is our financial data protected?',
        a: 'Access is role-scoped and logged, workstations are locked down, and every team member signs an NDA plus a data-handling agreement.',
      },
    ],
  },
  {
    slug: 'seo-digital-marketing',
    title: 'SEO & Digital Marketing',
    tagline: 'Visibility that converts',
    icon: 'TrendingUp',
    accent: 'violet',
    featured: true,
    order: 3,
    summary:
      'Search, content and paid media run as one system, measured against pipeline rather than vanity impressions.',
    heroHeadline: 'Rankings are the input. Revenue is the metric.',
    heroSub:
      'Technical SEO, content, paid media and conversion work managed by one accountable team, reported against the numbers your board cares about.',
    capabilities: [
      { title: 'Technical & on-page SEO', description: 'Crawl health, Core Web Vitals, schema and internal linking fixed at the source.' },
      { title: 'Local SEO', description: 'Google Business Profile, citation consistency and location pages that win the map pack.' },
      { title: 'Generative & answer engine optimisation', description: 'Structured content built to be cited by AI search surfaces and featured answers.' },
      { title: 'Paid search & paid social', description: 'PPC managed to CPA targets, with creative testing built into the cadence.' },
      { title: 'Content marketing', description: 'Editorial calendars, long-form content and distribution mapped to buying-stage intent.' },
      { title: 'CRO & analytics', description: 'A/B testing, funnel instrumentation and GA4 reporting you can trust.' },
    ],
    outcomes: [
      { label: 'Average organic lift, 6 months', value: '+164%' },
      { label: 'Cost per lead', value: '-41%' },
      { label: 'Reporting cadence', value: 'Weekly' },
    ],
    deliverables: [
      '90-day growth roadmap with prioritised bets',
      'Live performance dashboard, always on',
      'Monthly strategy review with your team',
      'Full admin access to every account and asset',
    ],
    faqs: [
      {
        q: 'How soon do we see movement?',
        a: 'Technical and local wins typically show inside 30 to 60 days. Competitive organic rankings are a four to six month horizon, and we set that expectation in writing up front.',
      },
      {
        q: 'Do we own the ad accounts?',
        a: 'Always. Accounts are created under your billing and you retain admin access permanently.',
      },
    ],
  },
  {
    slug: 'human-resources',
    title: 'Human Resource Management',
    tagline: 'Hire, onboard, retain',
    icon: 'Users',
    accent: 'teal',
    featured: true,
    order: 4,
    summary:
      'Sourcing, screening, onboarding and HR operations run as a managed function, so your leaders stay out of the applicant tracking system.',
    heroHeadline: 'The people function, professionally run',
    heroSub:
      'End-to-end recruitment and HR operations, from role scoping and sourcing through onboarding, payroll coordination and policy administration.',
    capabilities: [
      { title: 'Talent sourcing & screening', description: 'Calibrated shortlists with structured scorecards, not a stack of unfiltered CVs.' },
      { title: 'Onboarding programmes', description: 'Day-one-ready checklists, documentation and 30/60/90 plans for every hire.' },
      { title: 'Payroll & benefits coordination', description: 'Accurate, on-schedule runs coordinated with your provider and finance team.' },
      { title: 'HR policy & compliance', description: 'Handbooks, contracts and process documentation kept current with local requirements.' },
      { title: 'Performance management', description: 'Review cycles, competency frameworks and calibration support.' },
      { title: 'Employee engagement', description: 'Pulse surveys, retention analysis and interventions that address the real cause.' },
    ],
    outcomes: [
      { label: 'Time to shortlist', value: '7 days' },
      { label: 'Offer acceptance', value: '89%' },
      { label: '12-month retention', value: '91%' },
    ],
    deliverables: [
      'Calibrated role scorecard before sourcing begins',
      'Weekly pipeline report with stage-by-stage data',
      'Structured interview kits for your panel',
      'Onboarding pack for every accepted offer',
    ],
    faqs: [
      {
        q: 'Do you replace our internal HR team?',
        a: 'Rarely. Most clients keep strategic HR in-house and hand us the operational load: sourcing, screening, administration and reporting.',
      },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    tagline: 'Delivery you can plan around',
    icon: 'ClipboardList',
    accent: 'brand',
    featured: true,
    order: 5,
    summary:
      'Certified project and programme managers who own scope, schedule, risk and the uncomfortable status update.',
    heroHeadline: 'Someone accountable for the date',
    heroSub:
      'PMP and Scrum-certified managers who run your delivery cadence, hold vendors to their commitments and surface risk while it is still cheap to fix.',
    capabilities: [
      { title: 'Programme & project delivery', description: 'Plans, dependencies and critical-path management across teams and vendors.' },
      { title: 'Agile transformation', description: 'Backlog hygiene, ceremony design and velocity reporting that means something.' },
      { title: 'PMO setup', description: 'Templates, governance and reporting standards installed and then actually maintained.' },
      { title: 'Risk & issue management', description: 'Live registers with named owners, mitigation plans and escalation paths.' },
      { title: 'Vendor coordination', description: 'A single point of accountability across your third-party suppliers.' },
      { title: 'Stakeholder reporting', description: 'Executive dashboards that tell the truth without needing a translator.' },
    ],
    outcomes: [
      { label: 'On-time delivery', value: '93%' },
      { label: 'Scope creep reduction', value: '-47%' },
      { label: 'Status cadence', value: 'Weekly' },
    ],
    deliverables: [
      'Baselined plan with milestones and dependencies',
      'Live risk and issue register',
      'Weekly executive status report',
      'Post-project retrospective and lessons log',
    ],
    faqs: [
      {
        q: 'Which tools do you work in?',
        a: 'Jira, Asana, Monday, ClickUp, Smartsheet or MS Project. We adopt your stack rather than asking you to adopt ours.',
      },
    ],
  },
  {
    slug: 'design-ux',
    title: 'Graphics & UI/UX Design',
    tagline: 'Interfaces that earn trust',
    icon: 'Palette',
    accent: 'violet',
    featured: true,
    order: 6,
    summary:
      'Product design, design systems and brand work from a team that ships to production, not just to Figma.',
    heroHeadline: 'Design that survives contact with engineering',
    heroSub:
      'Research-led product design, documented design systems and brand identity, delivered as tokens and components your developers can build from.',
    capabilities: [
      { title: 'Product & UX design', description: 'Flows, wireframes and high-fidelity interfaces grounded in user research.' },
      { title: 'Design systems', description: 'Token-driven component libraries with usage rules and accessibility annotations.' },
      { title: 'Brand identity', description: 'Logo, palette, typography and a usage guide that keeps teams consistent.' },
      { title: 'Usability research', description: 'Moderated testing, heuristic review and findings mapped to prioritised fixes.' },
      { title: 'Marketing & motion graphics', description: 'Campaign assets, pitch decks and short-form motion for social and product.' },
      { title: 'Accessibility audits', description: 'WCAG 2.2 AA review with a remediation backlog your team can work through.' },
    ],
    outcomes: [
      { label: 'Task completion lift', value: '+38%' },
      { label: 'Design-to-dev handoff', value: '2 days' },
      { label: 'Accessibility target', value: 'WCAG 2.2 AA' },
    ],
    deliverables: [
      'Figma source files with full edit access',
      'Documented design tokens and components',
      'Annotated handoff specs for engineering',
      'Accessibility notes on every screen',
    ],
    faqs: [
      {
        q: 'Can you work with our existing design system?',
        a: 'Yes. Extending an established system is usually faster and cheaper than replacing it, and we will tell you when that is the right call.',
      },
    ],
  },
  {
    slug: 'supply-chain',
    title: 'Supply Chain Management',
    tagline: 'From order to delivery',
    icon: 'Truck',
    accent: 'teal',
    order: 7,
    summary:
      'Procurement, vendor management, logistics coordination and inventory control run as a continuous operation.',
    heroHeadline: 'Fewer surprises between order and delivery',
    heroSub:
      'Sourcing, purchase order management, freight coordination and inventory analytics handled by a team that lives in your ERP.',
    capabilities: [
      { title: 'Procurement & sourcing', description: 'Supplier identification, RFQ management and negotiation support.' },
      { title: 'Vendor management', description: 'Scorecards, contract tracking and quarterly performance reviews.' },
      { title: 'Logistics coordination', description: 'Freight booking, customs documentation and exception handling.' },
      { title: 'Inventory optimisation', description: 'Reorder points, safety stock modelling and dead-stock reporting.' },
      { title: 'Demand planning', description: 'Forecast models tuned to your seasonality and lead times.' },
      { title: 'Supply chain analytics', description: 'Cost-to-serve, OTIF and landed-cost reporting on a fixed cadence.' },
    ],
    outcomes: [
      { label: 'Procurement savings', value: '-22%' },
      { label: 'OTIF improvement', value: '+31%' },
      { label: 'Stockout reduction', value: '-44%' },
    ],
    deliverables: [
      'Supplier scorecard and review cadence',
      'Purchase order tracking dashboard',
      'Monthly inventory health report',
      'Escalation matrix for shipment exceptions',
    ],
    faqs: [],
  },
  {
    slug: 'asset-management',
    title: 'Asset Management',
    tagline: 'Know what you own',
    icon: 'Boxes',
    accent: 'gold',
    order: 8,
    summary:
      'Lifecycle tracking, maintenance scheduling and compliance reporting across your physical and digital assets.',
    heroHeadline: 'Every asset accounted for, from purchase to disposal',
    heroSub:
      'Register maintenance, depreciation schedules, warranty tracking and audit-ready reporting across sites and systems.',
    capabilities: [
      { title: 'Asset register management', description: 'A single, reconciled register across sites, categories and cost centres.' },
      { title: 'Preventive maintenance', description: 'Scheduled work orders, technician assignment and completion tracking.' },
      { title: 'Depreciation & lifecycle', description: 'Schedules maintained in step with your finance team and policy.' },
      { title: 'Warranty & contract tracking', description: 'Renewal alerts before the deadline, not after it.' },
      { title: 'Audit & compliance reporting', description: 'Evidence packs assembled and ready before the auditor asks.' },
      { title: 'Disposal management', description: 'Documented decommissioning with data-wipe certification where relevant.' },
    ],
    outcomes: [
      { label: 'Register accuracy', value: '99.4%' },
      { label: 'Unplanned downtime', value: '-35%' },
      { label: 'Audit prep time', value: '-70%' },
    ],
    deliverables: [
      'Reconciled master asset register',
      'Preventive maintenance calendar',
      'Monthly exception and variance report',
      'Audit evidence pack on demand',
    ],
    faqs: [],
  },
  {
    slug: 'facilities-management',
    title: 'Facilities Management',
    tagline: 'Buildings that run themselves',
    icon: 'Building2',
    accent: 'brand',
    order: 9,
    summary:
      'Helpdesk, vendor coordination, compliance and space planning support for multi-site property portfolios.',
    heroHeadline: 'One desk for every building issue',
    heroSub:
      'Ticket triage, contractor dispatch, compliance calendars and cost reporting across your entire property portfolio.',
    capabilities: [
      { title: 'Facilities helpdesk', description: 'Triage, dispatch and SLA tracking on every request that comes in.' },
      { title: 'Contractor coordination', description: 'Scheduling, access management and work verification.' },
      { title: 'Compliance calendars', description: 'Inspections, certifications and renewals tracked to the date.' },
      { title: 'Space planning support', description: 'Occupancy data, floor plan maintenance and move coordination.' },
      { title: 'Energy & cost reporting', description: 'Consumption trends and cost-per-square-foot benchmarking.' },
      { title: 'Soft services oversight', description: 'Cleaning, security and catering vendor performance management.' },
    ],
    outcomes: [
      { label: 'Ticket first response', value: 'Under 15 min' },
      { label: 'SLA compliance', value: '97%' },
      { label: 'Facilities spend', value: '-18%' },
    ],
    deliverables: [
      'Helpdesk with documented SLA tiers',
      'Live compliance calendar',
      'Monthly portfolio cost report',
      'Vendor performance scorecards',
    ],
    faqs: [],
  },
  {
    slug: 'construction-development',
    title: 'Construction & Development',
    tagline: 'Support from bid to handover',
    icon: 'HardHat',
    accent: 'gold',
    order: 10,
    summary:
      'Estimating, submittals, document control and schedule support for contractors and developers.',
    heroHeadline: 'Back-office muscle for the build',
    heroSub:
      'Quantity take-offs, bid packages, RFI and submittal logs, and schedule updates handled by a construction-literate team.',
    capabilities: [
      { title: 'Estimating & take-offs', description: 'Quantity surveys and cost models built from drawings and specifications.' },
      { title: 'Bid package preparation', description: 'Scope sheets, subcontractor outreach and bid levelling.' },
      { title: 'Submittal & RFI management', description: 'Logs maintained, chased and closed rather than left to drift.' },
      { title: 'Document control', description: 'Drawing registers, revision control and distribution management.' },
      { title: 'Schedule support', description: 'Programme updates, look-aheads and progress reporting.' },
      { title: 'Cost tracking', description: 'Budget-to-actual reporting with change order visibility.' },
    ],
    outcomes: [
      { label: 'Take-off turnaround', value: '48 hrs' },
      { label: 'Bid capacity increase', value: '2.4x' },
      { label: 'RFI close rate', value: '96%' },
    ],
    deliverables: [
      'Structured estimate with assumptions logged',
      'Maintained submittal and RFI registers',
      'Weekly look-ahead schedule',
      'Budget-to-actual cost report',
    ],
    faqs: [],
  },
  {
    slug: 'research',
    title: 'Research & Analysis',
    tagline: 'Decisions backed by evidence',
    icon: 'Search',
    accent: 'violet',
    order: 11,
    summary:
      'Market research, competitive intelligence and data analysis delivered as briefs your leadership can act on.',
    heroHeadline: 'Research that ends in a recommendation',
    heroSub:
      'Market sizing, competitor teardowns, survey design and data analysis, written up as a decision brief rather than a data dump.',
    capabilities: [
      { title: 'Market & industry research', description: 'Sizing, segmentation and trend analysis with sources cited throughout.' },
      { title: 'Competitive intelligence', description: 'Positioning, pricing and feature teardowns refreshed on a schedule.' },
      { title: 'Survey design & fielding', description: 'Instrument design, fielding and statistically sound analysis.' },
      { title: 'Data analysis', description: 'Cleaning, modelling and visualisation of your own operational data.' },
      { title: 'Literature & policy review', description: 'Structured synthesis of academic and regulatory sources.' },
      { title: 'Due diligence support', description: 'Background research packs for partnerships, vendors and acquisitions.' },
    ],
    outcomes: [
      { label: 'Standard brief turnaround', value: '5 days' },
      { label: 'Sources cited per brief', value: '25+' },
      { label: 'Analyst review layers', value: '2' },
    ],
    deliverables: [
      'Executive summary with a clear recommendation',
      'Full brief with cited sources',
      'Underlying data and models handed over',
      'Walkthrough session with your team',
    ],
    faqs: [],
  },
];

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
