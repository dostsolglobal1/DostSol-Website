/* DostSol Global — redesign prototype: shared header/footer, data, interactions */
(function () {
  "use strict";

  /* ---------- Icons (Lucide-style, 24px stroke) ---------- */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    crane: '<path d="M2 20h20M6 20V8l6-4 6 4v12M10 20v-6h4v6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65M22 12.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5M19.1 4.9C23 8.8 23 15.1 19.1 19"/><circle cx="12" cy="12" r="2"/>',
    hotel: '<path d="M2 20h20M4 20V8h16v12M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01M9 4h6v4H9z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  };
  const icon = (n, cls) => `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.check}</svg>`;
  window.DS_ICON = icon;

  /* ---------- Services data (copy from live site, tightened) ---------- */
  const SERVICES = [
    { slug: "it", icon: "code", name: "IT & AI Services", short: "Software, AI, web, helpdesk & infrastructure",
      title: "IT and AI outsourcing that lets you work smarter.",
      lead: "End-to-end IT and AI services that improve efficiency, automate routine work, keep your systems secure and move digital transformation forward.",
      body: ["DostSol Global provides end-to-end IT outsourcing built around how modern businesses actually run. We cover custom software and application development, IT support and helpdesk, website builds, infrastructure management, cybersecurity and data analytics.", "Our AI services help you put artificial intelligence to practical use: AI chatbots and virtual assistants, workflow automation, machine learning models and AI integrations that plug into the tools you already use. We start with a clear business case, so every AI project saves time or cost you can measure.", "We pair current technology with proven industry standards to keep your operations running smoothly, your systems secure and your data working for your business."],
      caps: ["AI Solutions & Automation", "AI Chatbots & Virtual Assistants", "IT Support & Helpdesk", "Website Development", "Infrastructure Management", "Cybersecurity Solutions", "Data Management", "Application Development", "Network Management", "Software Development"],
      feats: ["User-friendly UI/UX", "Goal-focused delivery", "Secure by design", "Smooth user flows", "Polished visuals"] },
    { slug: "hr", icon: "users", name: "HR Services", short: "Recruitment, onboarding, payroll & compliance",
      title: "HR solutions that empower your people.",
      lead: "Streamline hiring, improve the employee experience and stay compliant, so you can focus on growing the business.",
      body: ["Our HR outsourcing covers the full employee lifecycle, from sourcing and recruiting the right people to onboarding, payroll and benefits, performance and employee relations.", "We build HR frameworks that scale with you and keep you aligned with labor regulations, while your leadership stays focused on strategy."],
      caps: ["Talent Acquisition", "Onboarding & Orientation", "Payroll & Benefits Administration", "Performance Management", "Employee Relations", "Training & Development", "HR Compliance & Policies", "Workforce Planning & Analytics"],
      feats: ["Recruitment support", "Goal-focused hiring", "Legal compliance", "On/offboarding", "Payroll & benefits"] },
    { slug: "accounting", icon: "calc", name: "Accounting & Finance", short: "Bookkeeping, reporting, tax & FP&A",
      title: "Accounting & finance that keeps you in control.",
      lead: "Reliable financial operations that simplify compliance, improve cash flow and support better decisions.",
      body: ["DostSol Global is a trusted partner for accounting and finance outsourcing in the US. Our services span bookkeeping, financial reporting, tax preparation and strategic financial planning, all designed to keep your business financially healthy and compliant.", "Our analysts work in QuickBooks Online, Zoho Books, Yardi Breeze and ERP platforms, combining modern tools with proven methods to deliver accurate, transparent and useful financial insight."],
      caps: ["Bookkeeping & General Accounting", "Financial Reporting & Analysis", "Tax Preparation & Filing", "AP & AR Management", "Payroll Processing", "Budgeting & Forecasting", "Audit Support & Compliance", "Cash Flow Management"],
      feats: ["Real-time tracking", "Accuracy first", "Secure data handling", "Custom reports", "Regulatory compliance"] },
    { slug: "seo", icon: "trend", name: "SEO & Digital Marketing", short: "SEO, GEO/AEO, PPC, social & content",
      title: "SEO & digital marketing that drives growth you can measure.",
      lead: "Results-focused SEO and digital marketing that grows your visibility, reaches the right audience and turns traffic into revenue.",
      body: ["We build search visibility for both traditional results and AI-driven answer engines, using intent-driven strategy, semantic SEO and topical authority.", "Paid, social, content and email campaigns are planned together and measured in Google Analytics and Search Console, so every dollar can be traced to results."],
      caps: ["Search Engine Optimization", "Local SEO", "Generative Engine Optimization (GEO)", "Answer Engine Optimization (AEO)", "Pay-Per-Click Advertising", "Social Media Marketing", "Content Marketing & Blogging", "Conversion Rate Optimization"],
      feats: ["Targeted traffic", "Keyword strategy", "Data-driven tracking", "Cross-platform", "Continuous A/B testing"] },
    { slug: "project-management", icon: "kanban", name: "Project Management", short: "Planning, delivery, risk & reporting",
      title: "Project management that delivers on time.",
      lead: "End-to-end project management with strategic planning, disciplined execution and on-time delivery aligned to your goals.",
      body: ["We provide full-spectrum project management from kickoff to close. Our project managers keep every engagement on schedule, on budget and up to standard.", "Whether you run Agile sprints or Waterfall programs, we give you clear plans, real-time progress tracking and proactive stakeholder communication."],
      caps: ["Project Planning & Scheduling", "Budgeting & Cost Management", "Risk Assessment & Mitigation", "Resource Allocation", "Progress Tracking & Reporting", "Stakeholder Management", "Agile & Waterfall Delivery", "Quality Control & Compliance"],
      feats: ["Goal-oriented planning", "Real-time monitoring", "Cross-team collaboration", "Fast issue resolution", "Scales to any size"] },
    { slug: "design", icon: "pen", name: "Graphics & UI/UX Design", short: "Brand identity, product & marketing design",
      title: "Design that captivates, communicates and converts.",
      lead: "Strong visuals and intuitive user experiences that strengthen your brand and drive engagement on every platform.",
      body: ["Great design does more than look good. It communicates, converts and leaves a lasting impression. Our creative team crafts brand identity systems, marketing collateral, web graphics and product interfaces.", "We study your brand and audience, then build a visual language that stays consistent on every platform and touchpoint."],
      caps: ["UI/UX for Web & Mobile", "Logo & Brand Identity", "Wireframing & Prototyping", "Social Media Graphics", "Print & Marketing Collateral", "Website & App Redesign", "User Research & Journey Mapping", "Interactive Design & Animation"],
      feats: ["User-centered", "Consistent branding", "Responsive & accessible", "Seamless navigation", "Figma · XD · Illustrator"] },
    { slug: "asset-management", icon: "layers", name: "Asset Management", short: "Tracking, lifecycle & lease administration",
      title: "Asset management that maximizes value and minimizes risk.",
      lead: "Track, maintain and optimize your assets for better efficiency and long-term performance.",
      body: ["We help you get the most value and efficiency from your assets through asset tracking, maintenance scheduling and performance analysis.", "Our team also supports lease administration and NNN/CAM reconciliations for US real-estate portfolios, so assets stay well-documented, compliant and audit-ready."],
      caps: ["Asset Tracking & Inventory", "Lifecycle Management", "Maintenance Scheduling", "Valuation & Depreciation", "Procurement & Disposal Planning", "Compliance & Audit Readiness", "Digital Asset Management", "Reporting & Analytics"],
      feats: ["Centralized database", "Real-time monitoring", "Automated alerts", "Custom reporting", "Risk & compliance"] },
    { slug: "supply-chain", icon: "truck", name: "Supply Chain Management", short: "Procurement, inventory & logistics",
      title: "Supply chains that run lean and deliver on time.",
      lead: "Better visibility, lower costs and timely delivery at every stage of your supply chain.",
      body: ["Moving goods from point A to point B sounds simple until it isn't. We bring order to every layer of your supply chain, from finding the right suppliers and negotiating contracts that protect your margins to balancing inventory and keeping logistics on schedule.", "The result is a leaner, more reliable operation where costs stay in check and products arrive on time."],
      caps: ["Procurement & Sourcing", "Inventory Management", "Warehousing & Distribution", "Logistics Coordination", "Demand Planning & Forecasting", "Supplier Relationship Management", "Order Fulfillment & Tracking", "Supply Chain Analytics"],
      feats: ["End-to-end visibility", "Cost-effective logistics", "Real-time inventory", "Scalable operations", "Data-driven optimization"] },
    { slug: "construction", icon: "crane", name: "Construction & Development", short: "Feasibility, design & construction management",
      title: "Construction & development built on strong foundations.",
      lead: "Construction and development services that ensure quality, efficiency and long-term value from concept to completion.",
      body: ["We support every phase of your project, from the first site visit to long after your doors open. Detailed ground assessments, purposeful architectural planning and rigorous on-site oversight are the backbone of how we work.", "We pay close attention to the details others overlook, like resource efficiency, schedule integrity and quality at every milestone, so you end up with a lasting asset."],
      caps: ["Project Planning & Management", "Architectural Design & Engineering", "Site Evaluation & Feasibility", "Budgeting & Cost Estimation", "Residential & Commercial Builds", "Renovation & Remodeling", "QA & Safety Compliance", "Post-Construction Support"],
      feats: ["End-to-end execution", "On-time & on-budget", "Modern technology", "Safety compliance", "Sustainable building"] },
    { slug: "facilities", icon: "building", name: "Facilities Management", short: "Maintenance, space planning & safety",
      title: "Facilities management that keeps operations running.",
      lead: "Facilities management that keeps your physical assets and workspaces safe, efficient and performing well.",
      body: ["We take the complexity out of facilities management. From day-to-day maintenance and smart space planning to rigorous safety standards, we keep your workplace running reliably every day.", "Our facility solutions fix inefficiencies at the root, improving building performance while keeping costs under control."],
      caps: ["Preventive & Reactive Maintenance", "Workspace Planning", "Health & Safety Compliance", "Electrical & Mechanical Support", "Janitorial & Cleaning", "Inspections & Audits", "Emergency Repair & Support", "Facility Risk Reporting"],
      feats: ["24/7 operational support", "Efficient resourcing", "Preventive scheduling", "Health & safety", "Any facility size"] },
    { slug: "research", icon: "search", name: "Research Work", short: "Market research, feasibility & analysis",
      title: "Research that turns data into decisions.",
      lead: "Professional research that delivers accurate, data-driven insight for strategy, innovation and evidence-based decisions.",
      body: ["We dig deep, with thorough market research, honest feasibility assessments and sharp data analysis that cuts through the noise.", "You get clear, grounded findings tied directly to your business goals, so you can move forward with sharper strategy and more confidence."],
      caps: ["Market Research & Analysis", "Academic & Educational Research", "Competitor Benchmarking", "Feasibility Studies", "Survey Design & Data Collection", "Industry Trend Analysis", "Report Writing & Presentation", "Qualitative & Quantitative Research"],
      feats: ["Insight-oriented", "Reliable methods", "Tailored scope", "Confidential & ethical", "Visual reports"] },
  ];
  window.DS_SERVICES = SERVICES;

  const CONTACT = {
    phones: [["(+1) 281 600 3570", "+12816003570"], ["(042) 3235 0272", "+924232350272"], ["(+92) 339 0786280", "+923390786280"]],
    email: "info@dostsol.com",
    address: "251-L Johar Town, Lahore, Pakistan",
    linkedin: "https://www.linkedin.com/company/dost-solution/",
  };
  window.DS_CONTACT = CONTACT;

  /* ---------- Header ---------- */
  const page = document.body.dataset.page || "";
  const navItem = (href, label, key) => `<li><a href="${href}" class="${page === key ? "active" : ""}">${label}</a></li>`;
  const megaLinks = SERVICES.slice(0, 10).map(s =>
    `<a href="service.html?s=${s.slug}"><span class="mi">${icon(s.icon)}</span><span><strong>${s.name}</strong><small>${s.short}</small></span></a>`).join("");

  const header = `
  <header class="site-header" id="siteHeader">
    <div class="topbar"><div class="container">
      <div class="tb-left">
        <a href="mailto:${CONTACT.email}">${icon("mail")}${CONTACT.email}</a>
        <a href="tel:${CONTACT.phones[0][1]}">${icon("phone")}${CONTACT.phones[0][0]}</a>
        <span>${icon("clock")}24/7 support for US clients</span>
      </div>
      <div class="tb-right">
        <a href="${CONTACT.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}LinkedIn</a>
        <a href="contact.html">Careers</a>
      </div>
    </div></div>
    <div class="nav-wrap"><div class="container"><nav class="nav" aria-label="Main">
      <a class="brand" href="index.html" aria-label="DostSol Global home"><img src="assets/logo.png" alt="DostSol Global"></a>
      <ul class="menu">
        ${navItem("index.html", "Home", "home")}
        ${navItem("about.html", "About", "about")}
        <li class="has-mega">
          <a href="services.html" class="${page === "services" ? "active" : ""}">Services ${icon("chev", "chev")}</a>
          <div class="mega">
            <div class="mega-grid">${megaLinks}</div>
            <div class="mega-side">
              <span class="eyebrow">Not sure where to start?</span>
              <h4>Build a dedicated offshore team</h4>
              <p>Tell us what you need. We'll recommend the right mix of people, process and tools for your goals.</p>
              <a class="btn btn-primary btn-sm" href="contact.html">Book a call ${icon("arrow")}</a>
            </div>
          </div>
        </li>
        ${navItem("team.html", "Our Team", "team")}
        ${navItem("blog.html", "Blog", "blog")}
        ${navItem("faq.html", "FAQ", "faq")}
        ${navItem("contact.html", "Contact", "contact")}
      </ul>
      <div class="nav-cta">
        <a class="btn btn-ghost-dark btn-sm" href="tel:${CONTACT.phones[0][1]}">${icon("phone")} Call us</a>
        <a class="btn btn-primary btn-sm" href="contact.html">Get a free consultation</a>
        <button class="burger" id="burger" aria-label="Open menu">${icon("menu")}</button>
      </div>
    </nav></div></div>
  </header>
  <div class="mobile-panel" id="mobilePanel" aria-hidden="true">
    <div class="mp-head"><img src="assets/logo.png" alt="DostSol Global"><button class="burger" id="burgerClose" aria-label="Close menu" style="display:grid">${icon("x")}</button></div>
    <nav>
      <a href="index.html">Home</a><a href="about.html">About</a>
      <details><summary>Services ${icon("chev", "chev")}</summary>
        ${SERVICES.map(s => `<a href="service.html?s=${s.slug}">${s.name}</a>`).join("")}
        <a href="services.html" style="color:var(--teal)">All services →</a>
      </details>
      <a href="team.html">Our Team</a><a href="blog.html">Blog</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a>
    </nav>
    <a class="btn btn-primary" href="contact.html">Get a free consultation</a>
  </div>`;

  /* ---------- Footer ---------- */
  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="f-top">
        <div class="f-brand">
          <img src="assets/logo.png" alt="DostSol Global">
          <p>DostSol Global connects global talent with local businesses, providing tailored outsourcing that streamlines operations, reduces costs and speeds up growth.</p>
          <div class="socials">
            <a href="${CONTACT.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
            <a href="#" aria-label="Facebook">${icon("facebook")}</a>
            <a href="#" aria-label="Instagram">${icon("instagram")}</a>
          </div>
        </div>
        <div><h5>Services</h5><ul class="f-links">
          ${SERVICES.slice(0, 6).map(s => `<li><a href="service.html?s=${s.slug}">${s.name}</a></li>`).join("")}
          <li><a href="services.html" style="color:var(--teal)">View all services →</a></li>
        </ul></div>
        <div><h5>Company</h5><ul class="f-links">
          <li><a href="about.html">About us</a></li><li><a href="team.html">Our team</a></li>
          <li><a href="blog.html">Blog</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Careers</a></li>
          <li><a href="contact.html">Contact</a></li><li><a href="#">Privacy policy</a></li>
        </ul></div>
        <div><h5>Get in touch</h5><div class="f-contact">
          <div>${icon("pin")}<span>${CONTACT.address}</span></div>
          <div>${icon("mail")}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a></div>
          <div>${icon("phone")}<span>${CONTACT.phones.map(p => `<a href="tel:${p[1]}">${p[0]}</a>`).join("<br>")}</span></div>
          <div>${icon("clock")}<span>Available 24/7</span></div>
        </div></div>
      </div>
      <div class="f-news">
        <h4>Get outsourcing insights in your inbox.</h4>
        <form onsubmit="event.preventDefault();this.querySelector('button').textContent='Subscribed ✓'">
          <input type="email" required placeholder="Your work email" aria-label="Email">
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
      </div>
      <div class="f-bottom">
        <span>© ${new Date().getFullYear()} DOSTSOL GLOBAL PVT LIMITED. All rights reserved.</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms</a></span>
      </div>
      <div class="f-watermark" aria-hidden="true">DOSTSOL</div>
    </div>
  </footer>
  <button class="to-top" id="toTop" aria-label="Back to top">${icon("up")}</button>`;

  const h = document.getElementById("header-slot");
  if (h) h.outerHTML = header;
  const f = document.getElementById("footer-slot");
  if (f) f.outerHTML = footer;

  /* ---------- Replace [data-icon] placeholders ---------- */
  document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon); });

  /* ---------- Header scroll state ---------- */
  const hdr = document.getElementById("siteHeader");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const y = window.scrollY;
    hdr && hdr.classList.toggle("scrolled", y > 30);
    toTop && toTop.classList.toggle("show", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile menu ---------- */
  const panel = document.getElementById("mobilePanel");
  const setPanel = open => { panel.classList.toggle("open", open); panel.setAttribute("aria-hidden", String(!open)); document.body.style.overflow = open ? "hidden" : ""; };
  document.getElementById("burger")?.addEventListener("click", () => setPanel(true));
  document.getElementById("burgerClose")?.addEventListener("click", () => setPanel(false));

  /* ---------- Reveal on scroll (?static disables animation, for screenshots) ---------- */
  const STATIC = new URLSearchParams(location.search).has("static");
  if (STATIC) document.documentElement.classList.add("static");
  const io = !STATIC && "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  window.DS_REVEAL = root => (root || document).querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  window.DS_REVEAL();

  /* ---------- Carousels (scroll-snap track + arrows, dots, autoplay) ---------- */
  document.querySelectorAll("[data-carousel]").forEach(car => {
    const track = car.querySelector("[data-track]"), slides = [...track.children];
    const dots = car.querySelector("[data-dots]"), prev = car.querySelector("[data-prev]"), next = car.querySelector("[data-next]");
    const perView = () => Math.max(1, Math.round(track.clientWidth / slides[0].getBoundingClientRect().width));
    const pages = () => Math.max(1, slides.length - perView() + 1);
    const current = () => Math.round(track.scrollLeft / (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : 1));
    const go = i => { const n = pages(); i = (i + n) % n; track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft }); };
    const render = () => {
      const n = pages(), cur = Math.min(current(), n - 1);
      if (dots.children.length !== n) {
        dots.innerHTML = Array.from({ length: n }, (_, i) => `<button type="button" aria-label="Go to slide ${i + 1}"></button>`).join("");
        [...dots.children].forEach((b, i) => b.addEventListener("click", () => { go(i); restart(); }));
      }
      [...dots.children].forEach((b, i) => b.setAttribute("aria-current", String(i === cur)));
      car.querySelector(".car-controls").style.display = n > 1 ? "" : "none";
    };
    prev.addEventListener("click", () => { go(current() - 1); restart(); });
    next.addEventListener("click", () => { go(current() + 1); restart(); });
    track.addEventListener("scroll", () => requestAnimationFrame(render), { passive: true });
    window.addEventListener("resize", render);

    const reduce = STATIC || matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null, paused = false;
    const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!paused && !document.hidden) go(current() + 1); }, 6000); };
    ["mouseenter", "focusin", "touchstart"].forEach(ev => car.addEventListener(ev, () => { paused = true; }, { passive: true }));
    ["mouseleave", "focusout", "touchend"].forEach(ev => car.addEventListener(ev, () => { paused = false; }, { passive: true }));
    render(); restart();
  });

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const cio = !STATIC && "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
      const t0 = performance.now(), dur = 1600;
      const step = t => { const p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = v.toFixed(dec); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 }) : null;
  counters.forEach(c => cio ? cio.observe(c) : (c.textContent = c.dataset.count));
})();
