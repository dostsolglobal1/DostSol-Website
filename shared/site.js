/** Company-wide facts, navigation and marketing copy. Single source of truth. */

export const company = {
  name: 'DostSol Global',
  shortName: 'DostSol',
  legalName: 'DostSol Global (Pvt.) Ltd.',
  tagline: 'Outsource smarter. Operate better. Grow faster.',
  promise:
    'We build the offshore teams that let ambitious companies move at the speed of their ambition.',
  founded: 2019,
  email: 'info@dostsol.com',
  phones: [
    { label: 'United States', value: '+1 281 600 3570', href: 'tel:+12816003570' },
    { label: 'Pakistan', value: '+92 339 078 6280', href: 'tel:+923390786280' },
    { label: 'Landline', value: '(042) 3235 0272', href: 'tel:+924232350272' },
  ],
  offices: [
    {
      city: 'Lahore',
      country: 'Pakistan',
      label: 'Head office',
      address: '251-L Johar Town, Lahore, Pakistan',
      timezone: 'PKT (UTC+5)',
    },
    {
      city: 'Houston',
      country: 'United States',
      label: 'Client desk',
      address: 'Serving clients across North America',
      timezone: 'CST (UTC-6)',
    },
  ],
  hours: 'Support desk staffed 24 / 7',
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/dost-solution/' },
    { name: 'Facebook', href: 'https://www.facebook.com/dostsolglobal' },
    { name: 'Instagram', href: 'https://www.instagram.com/dostsolglobal' },
  ],
};

export const stats = [
  { value: 100, suffix: '+', label: 'Years of combined experience', detail: 'Across eleven delivery disciplines' },
  { value: 50, suffix: '+', label: 'Projects delivered', detail: 'From two-week sprints to multi-year programmes' },
  { value: 4.7, suffix: '', label: 'Average client rating', detail: 'Collected across engagement reviews', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Support coverage', detail: 'A named contact, not a ticket queue' },
];

export const differentiators = [
  {
    icon: 'Target',
    title: 'Senior by default',
    body: 'Every engagement is led by someone who has done the job, not someone who has read about it. No juniors billed as specialists.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Governance built in',
    body: 'NDAs, role-scoped access, audit logging and documented handover are part of the setup, not a paid add-on.',
  },
  {
    icon: 'LineChart',
    title: 'Reported against outcomes',
    body: 'You get a weekly written report tied to the metrics you named at kickoff. If a number moves the wrong way, you hear it from us first.',
  },
  {
    icon: 'Clock',
    title: 'Live in fourteen days',
    body: 'Scoping, contracting and team assembly run in parallel. Most engagements are producing work inside two weeks.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Client engagement & onboarding',
    body: 'We map your objectives, constraints and success metrics, then agree the working model in writing before anyone starts.',
    points: ['Discovery workshop', 'Success metrics defined', 'Engagement model agreed'],
  },
  {
    step: '02',
    title: 'Knowledge transfer & execution',
    body: 'Your team briefs ours once. We document it, build the runbook and start producing inside your tooling and rituals.',
    points: ['Documented runbook', 'Tooling access provisioned', 'First deliverable in two weeks'],
  },
  {
    step: '03',
    title: 'Reporting, feedback & optimisation',
    body: 'Weekly written reporting against agreed metrics, a monthly review, and continuous adjustment of the plan as the data comes in.',
    points: ['Weekly written report', 'Monthly strategy review', 'Quarterly roadmap reset'],
  },
  {
    step: '04',
    title: 'Governance, compliance & data security',
    body: 'Role-scoped access, signed agreements and audit trails throughout, so security review is a formality rather than a blocker.',
    points: ['NDA and DPA in place', 'Role-scoped access control', 'Audit trail on every system'],
  },
];

export const engagementModels = [
  {
    name: 'Dedicated team',
    price: 'From $2,400',
    unit: 'per specialist / month',
    description: 'A named team working only on your business, in your tools, on your cadence.',
    best: 'Ongoing product, finance or marketing functions',
    features: [
      'Full-time dedicated specialists',
      'Four to six hours of US overlap',
      'Direct Slack and calendar access',
      'Weekly written reporting',
      'Replace any team member at no cost',
    ],
  },
  {
    name: 'Managed function',
    price: 'From $6,800',
    unit: 'per function / month',
    description: 'We own an entire function end to end and report on outcomes rather than hours.',
    best: 'Bookkeeping, helpdesk, recruitment, SEO',
    featured: true,
    features: [
      'Outcome-based SLA, not timesheets',
      'Dedicated function lead',
      'Documented process and runbook',
      'Monthly executive review',
      'Surge capacity included',
      'Quarterly business review with leadership',
    ],
  },
  {
    name: 'Project engagement',
    price: 'Scoped',
    unit: 'fixed fee or milestone',
    description: 'A defined outcome with a defined date, priced once the scope is agreed.',
    best: 'Migrations, builds, audits, research',
    features: [
      'Fixed scope and fixed price',
      'Named project manager',
      'Milestone-based invoicing',
      'Full handover documentation',
      'Thirty-day post-delivery support',
    ],
  },
];

export const industries = [
  'Technology & SaaS',
  'Accounting & professional services',
  'Construction & real estate',
  'Healthcare administration',
  'E-commerce & retail',
  'Logistics & distribution',
  'Financial services',
  'Education',
];

export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    mega: true,
  },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Our team', href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
];

export const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'Information Technology', href: '/services/information-technology' },
      { label: 'Accounting & Finance', href: '/services/accounting-finance' },
      { label: 'SEO & Digital Marketing', href: '/services/seo-digital-marketing' },
      { label: 'Human Resources', href: '/services/human-resources' },
      { label: 'Project Management', href: '/services/project-management' },
      { label: 'All services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our team', href: '/team' },
      { label: 'How we work', href: '/how-we-work' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Book a consultation', href: '/contact' },
      { label: 'Frequently asked questions', href: '/how-we-work#faq' },
      { label: 'Engagement models', href: '/how-we-work#models' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
    ],
  },
];

export const faqs = [
  {
    q: 'How quickly can a team be working?',
    a: 'Fourteen days is the standard. Scoping, contracting and team assembly run in parallel rather than in sequence, and we will tell you on the first call if your requirement needs longer.',
  },
  {
    q: 'What does it actually cost compared to hiring locally?',
    a: 'Most clients see a 55 to 65 percent reduction against a fully loaded US in-house salary once benefits, recruitment, equipment and management overhead are counted. We will model your specific numbers during scoping.',
  },
  {
    q: 'How do you handle data security and compliance?',
    a: 'Every engagement starts with an NDA and a data processing agreement. Access is role-scoped and logged, devices are managed, and we work inside your systems rather than copying data into ours.',
  },
  {
    q: 'What happens if a team member is not working out?',
    a: 'You tell us, and we replace them at no cost. The runbook we maintain from day one means the replacement is productive in days rather than weeks.',
  },
  {
    q: 'Do we sign a long contract?',
    a: 'No. Dedicated team and managed function engagements run on a rolling monthly basis with thirty days notice. Project work is scoped and priced once.',
  },
  {
    q: 'Who owns the work you produce?',
    a: 'You do, without exception. IP assignment is executed before work begins and covers code, designs, documentation and data.',
  },
  {
    q: 'How much of our time will this take?',
    a: 'Roughly two hours in week one for the discovery workshop and knowledge transfer, then about thirty minutes a week for the standing review. The documentation burden is ours.',
  },
  {
    q: 'Can you work with our existing vendors and tools?',
    a: 'Yes. We adopt your stack and coordinate with your incumbent suppliers. Replacing tooling is a recommendation we make only when it is genuinely warranted.',
  },
];

export const team = [
  {
    name: 'Adil Abdullah',
    role: 'Founder & Chief Executive',
    initials: 'AA',
    order: 1,
    focus: ['Strategy', 'Client partnerships'],
    bio: 'Adil founded DostSol Global on a straightforward conviction: that offshore work fails when it is treated as a cost line and succeeds when it is treated as a team. He leads client strategy and holds the firm to its delivery standards.',
    linkedin: 'https://www.linkedin.com/company/dost-solution/',
  },
  {
    name: 'Aman Imran',
    role: 'Human Resources Manager',
    initials: 'AI',
    order: 2,
    focus: ['Talent', 'Culture'],
    bio: 'Aman runs recruitment and people operations, and owns the retention numbers that make long-running engagements possible. She built the structured screening process every DostSol hire passes through.',
    linkedin: 'https://www.linkedin.com/company/dost-solution/',
  },
  {
    name: 'Sarim Sajjad',
    role: 'Operations & SEO Lead',
    initials: 'SS',
    order: 3,
    focus: ['Search', 'Analytics'],
    bio: 'Sarim leads the search and digital practice and built the reporting framework the firm measures marketing engagements against. He is unusually willing to tell a client that a tactic is not working.',
    linkedin: 'https://www.linkedin.com/company/dost-solution/',
  },
  {
    name: 'Ali Iftikhar',
    role: 'Financial Analyst',
    initials: 'AI',
    order: 4,
    focus: ['Finance', 'Reporting'],
    bio: 'Ali oversees the accounting practice, from month-end close discipline to the management reporting packs that clients take into their board meetings.',
    linkedin: 'https://www.linkedin.com/company/dost-solution/',
  },
];

export const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Chief Operating Officer',
    company: 'Meridian Logistics',
    rating: 5,
    service: 'Supply Chain Management',
    order: 1,
    metric: { label: 'Procurement savings', value: '22%' },
    quote:
      'We had spent eighteen months trying to hire a procurement analyst. DostSol had two working inside our ERP in three weeks, and the first quarterly supplier review they ran found savings that paid for the engagement twice over.',
  },
  {
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Northlake Digital',
    rating: 5,
    service: 'SEO & Digital Marketing',
    order: 2,
    metric: { label: 'Organic traffic', value: '+164%' },
    quote:
      'What sold me was the reporting. Every Monday there is a written note explaining what moved, what did not, and what they are changing because of it. I have never had that from an agency before.',
  },
  {
    name: 'Ryan Miller',
    role: 'Finance Director',
    company: 'Cascade Property Group',
    rating: 5,
    service: 'Accounting & Finance',
    order: 3,
    metric: { label: 'Month-end close', value: '11 to 4 days' },
    quote:
      'Our close used to take eleven days and two weekends. It now takes four, the workpapers are audit-ready, and our controller has her evenings back. The transition was genuinely uneventful.',
  },
  {
    name: 'Priya Raghavan',
    role: 'VP Engineering',
    company: 'Stackline Health',
    rating: 5,
    service: 'Information Technology',
    order: 4,
    metric: { label: 'Release cadence', value: 'Weekly' },
    quote:
      'They embedded four engineers into our existing squads rather than running a separate team, which is the only model that has ever worked for us. Six months in, I could not tell you from the commit history who is in Lahore and who is in Boston.',
  },
  {
    name: 'Daniel Okafor',
    role: 'Managing Partner',
    company: 'Okafor & Reed',
    rating: 4,
    service: 'Human Resource Management',
    order: 5,
    metric: { label: 'Time to shortlist', value: '7 days' },
    quote:
      'The shortlists arrive calibrated, with scorecards, which means our partners spend their interview time on candidates who can actually do the work. It has changed how we hire.',
  },
  {
    name: 'Elena Vargas',
    role: 'Head of Product',
    company: 'Fieldwork Software',
    rating: 5,
    service: 'Graphics & UI/UX Design',
    order: 6,
    metric: { label: 'Task completion', value: '+38%' },
    quote:
      'They handed us a documented design system, not a folder of screens. Our developers stopped guessing, and the onboarding flow they redesigned lifted completion by nearly forty percent.',
  },
];

export const jobs = [
  {
    slug: 'senior-full-stack-engineer',
    title: 'Senior Full-Stack Engineer',
    department: 'Information Technology',
    location: 'Lahore, PK · Hybrid',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Build and maintain production systems for US clients across Node, React and cloud infrastructure, embedded directly in client squads.',
    responsibilities: [
      'Own features end to end, from technical design through deployment and monitoring',
      'Work inside client codebases and follow their architectural standards',
      'Review code and mentor mid-level engineers on the team',
      'Participate in client ceremonies during the US overlap window',
    ],
    requirements: [
      'Five or more years building production web applications',
      'Strong JavaScript or TypeScript, with Node and React depth',
      'Practical experience with AWS or Azure and CI/CD pipelines',
      'Clear written English, since most communication is asynchronous',
    ],
  },
  {
    slug: 'senior-accountant-us-gaap',
    title: 'Senior Accountant (US GAAP)',
    department: 'Accounting & Finance',
    location: 'Lahore, PK · On-site',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Run month-end close and management reporting for a portfolio of US clients in QuickBooks, Xero and NetSuite.',
    responsibilities: [
      'Own the close calendar and deliver within five business days',
      'Prepare reconciliations, journals and management reporting packs',
      'Maintain audit-ready workpapers throughout the year',
      'Act as the day-to-day finance contact for assigned clients',
    ],
    requirements: [
      'ACCA, CA or CPA qualified, or in the final stages',
      'Four or more years in US GAAP bookkeeping or controllership',
      'Fluency in QuickBooks Online and at least one mid-market ERP',
      'Comfortable presenting numbers directly to client leadership',
    ],
  },
  {
    slug: 'seo-strategist',
    title: 'SEO Strategist',
    department: 'SEO & Digital Marketing',
    location: 'Lahore, PK · Hybrid',
    type: 'Full-time',
    level: 'Mid to senior',
    summary:
      'Own organic strategy for US client accounts, from technical audit through content planning and performance reporting.',
    responsibilities: [
      'Run technical audits and prioritise fixes with client engineering teams',
      'Build keyword and content strategies mapped to buying intent',
      'Report weekly on rankings, traffic and pipeline contribution',
      'Keep the practice current on generative and answer engine optimisation',
    ],
    requirements: [
      'Three or more years of hands-on SEO on competitive accounts',
      'Fluency in GA4, Search Console, Ahrefs or Semrush, and Screaming Frog',
      'Ability to write a recommendation, not just produce a report',
      'Experience working directly with international clients',
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    department: 'Graphics & UI/UX Design',
    location: 'Lahore, PK · Hybrid',
    type: 'Full-time',
    level: 'Mid',
    summary:
      'Design product interfaces and maintain design systems for client teams shipping to production.',
    responsibilities: [
      'Take features from research and flows through to production-ready interfaces',
      'Maintain and extend token-driven design systems in Figma',
      'Annotate handoffs so engineering never has to guess',
      'Run usability sessions and turn findings into a prioritised backlog',
    ],
    requirements: [
      'Three or more years designing digital products, with a portfolio of shipped work',
      'Strong command of Figma, including components, variables and auto layout',
      'Working knowledge of WCAG 2.2 and accessible design practice',
      'Experience collaborating directly with engineers',
    ],
  },
  {
    slug: 'client-success-manager',
    title: 'Client Success Manager',
    department: 'Operations',
    location: 'Lahore, PK · On-site',
    type: 'Full-time',
    level: 'Mid to senior',
    summary:
      'Own the health of a portfolio of client engagements, from onboarding through renewal and expansion.',
    responsibilities: [
      'Run onboarding and the standing review cadence for assigned accounts',
      'Track delivery health and escalate risk before it reaches the client',
      'Produce the weekly written reporting clients receive',
      'Identify expansion opportunities grounded in delivered results',
    ],
    requirements: [
      'Four or more years in client success, account management or delivery',
      'Experience with US or European B2B clients',
      'Excellent written English and comfort chairing executive calls',
      'Availability for US-hours overlap',
    ],
  },
];
