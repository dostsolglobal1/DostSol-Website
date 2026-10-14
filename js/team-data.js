/* Team — names, roles, photos and bios taken from dostsol.com/our-team */
(function () {
  "use strict";
  const T = [
    { n: "Adil Abdullah", r: "Founder & Chief Executive Officer", img: "adil.jpg", g: "leadership",
      b: ["Adil is a results-driven business and operations leader with over 15 years of experience across outsourcing, real estate, telecommunications, hospitality and manufacturing. As Founder & CEO of DOSTSOL Global, he leads global service delivery across Accounting & Finance, HR, Administration, IT, Digital Marketing and Project Management for international clients.",
          "With a strong background in strategic planning, financial management and operational excellence, Adil is known for building scalable systems, leading high-performing teams and driving growth through process optimization and data-driven decisions."] },
    { n: "Aman Imran", r: "HR Manager", img: "aman.jpg", g: "leadership",
      b: ["Aman brings over 6 years of human resources experience across plastic surgery, BPO, software houses and outsourcing. She specializes in HR operations, talent management, employee engagement and organizational development.",
          "Her expertise extends to compliance, workforce planning and process optimization. At DOSTSOL Global she builds efficient HR frameworks, improves the employee experience and aligns people strategy with long-term business goals."] },
    { n: "Sarim Sajjad", r: "Operations & SEO Analyst", img: "sarim.jpg", g: "ops",
      b: ["Sarim brings over 2 years of hands-on experience in modern search engine optimization and digital performance. With a computer science background, he specializes in intent-driven strategy, semantic SEO and building topical authority.",
          "His expertise spans technical SEO, on- and off-page optimization, keyword research and analytics in Google Analytics and Search Console. He optimizes content for both traditional search results and AI-driven search experiences."] },
    { n: "Ali Iftikhar", r: "Financial Analyst", img: "ali.png", g: "finance",
      b: ["Ali is a Financial Analyst at DOSTSOL Global, supporting clients with financial analysis, reporting and accounting operations."] },
    { n: "Kashaf Tariq", r: "Software Engineer", img: "kashaf.jpg", g: "tech",
      b: ["Kashaf develops scalable, efficient software for international clients across industries. With a full-stack background, she builds reliable, user-focused applications with an emphasis on performance and modern engineering practices.",
          "Her expertise covers frontend and backend development, REST API integration, database management, dashboards and performance optimization."] },
    { n: "Usman Ishrat", r: "Senior Lease Administrator", img: "usman.jpg", g: "finance",
      b: ["Usman brings over 8 years of experience in finance, lease administration and property management across telecom, textiles and outsourcing. He specializes in lease operations, financial reconciliation and portfolio management for US-based clients.",
          "His expertise includes NNN/CAM reconciliations, financial reporting and process optimization, with a strong command of Yardi Breeze."] },
    { n: "Muhammad Safeer", r: "Financial Analyst", img: "safeer.jpg", g: "finance",
      b: ["Safeer brings over 3 years of finance and accounting experience across real estate and nonprofit sectors. He holds an MBA in Finance from Punjab University and specializes in financial reporting, variance analysis and accounting operations.",
          "He is proficient in Excel, QuickBooks Online and Zoho Books, and is certified in MS Excel Financials from IBPD."] },
    { n: "Irfan Khan", r: "Financial Analyst", img: "irfan.png", g: "finance",
      b: ["Irfan holds a Master's degree in Accounting from Australia and has on-site experience in Australia and Oman, plus remote experience supporting US clients.",
          "At DOSTSOL Global he leads financial analysis and reporting, identifies key trends, improves reporting processes and safeguards the integrity of financial data."] },
    { n: "Sultan Sarwar Khan", r: "Financial Analyst", img: "sultan.jpg", g: "finance",
      b: ["Sultan is a finance & accounting professional with 15+ years of experience in financial management, reporting, budgeting, forecasting, compliance, internal controls and audit management.",
          "He works in Advanced Excel, QuickBooks, Zoho Books and ERP systems, and holds an MBA in Finance, ACCA (part-qualified) and a B.Com."] },
    { n: "Noor ul Huda", r: "Financial Operations Analyst", img: "noor.jpg", g: "finance",
      b: ["Noor brings over 5 years of experience across finance, accounts, sales and administration, and holds a B.Com (Hons) from Lahore College for Women University.",
          "Her previous roles include TUV Austria, Allied Bank and Elite & Co."] },
    { n: "Muhammad Daniyal", r: "Cost Accountant", img: "daniyal.jpg", g: "finance",
      b: ["Daniyal is a Cost Accountant at DOSTSOL Global, supporting clients with costing, accounting and financial operations."] },
    { n: "Shoaib Azmy", r: "Insurance Analyst", img: "shoaib.jpg", g: "ops",
      b: ["Shoaib combines a computer science foundation with experience in administration, accounting, security operations and entrepreneurship.",
          "As an Insurance Analyst he specializes in policy processing, quotations, underwriting support, e-sign facilitation and customer service, with an emphasis on accuracy and compliance."] },
    { n: "Muhammad Yaqoob", r: "Insurance Analyst", img: "yaqoob.jpg", g: "ops",
      b: ["Yaqoob holds a BSc (Hons) in Accounting & Finance from LUMS and has experience across insurance, equity analysis, healthcare administration and financial operations.",
          "He specializes in premium analysis, portfolio management and financial reporting, with advanced skills in Excel, Power BI and financial modeling."] },
    { n: "Taimoor Hussain", r: "Medical Billing & Coding Analyst", img: "taimoor.jpg", g: "ops",
      b: ["Taimoor has over 3 years of experience in healthcare Revenue Cycle Management. A former Senior RCM Specialist, he brings expertise in claims processing, denial management, AR follow-up and regulatory compliance.",
          "He holds an MBA in Marketing from the University of the Punjab."] },
    { n: "Fatima Rafi", r: "Talent & Growth Executive", img: "fatima.jpg", g: "ops",
      b: ["Fatima brings 2 years of experience in talent sourcing, digital outreach and growth initiatives. She specializes in engaging high-quality talent, expanding professional networks and building employer brand.",
          "Her expertise includes candidate engagement, LinkedIn outreach, market research and social media engagement."] },
    { n: "Khadija Safdar", r: "E-commerce Executive", img: "khadija.jpg", g: "ops",
      b: ["Khadija has over 5 years of professional experience and holds a BBA (Hons) in Marketing. She manages online orders, fulfillment and dropshipping operations, and resolves customer queries.",
          "She also supports office administration, contributing to smooth day-to-day operations."] },
    { n: "Tatheer Zahra", r: "Office Administrator", img: "tatheer.jpg", g: "ops",
      b: ["Tatheer holds a Doctorate in Veterinary Sciences and brings over five years of customer service experience at BPO organizations including Mindbridge, Mohkam Dispatch and Solutions Hub.",
          "At DOSTSOL Global she manages fuel inventories and oversees client banking records with accuracy and efficiency."] },
    { n: "Saba Naqvi", r: "Office Administrator", img: "saba.jpg", g: "ops",
      b: ["Saba holds a Master's in Commerce and brings a diverse background in administration, customer service and people management, extending into social media marketing, content and business development.",
          "At DOSTSOL Global she manages fuel inventories and oversees client banking records."] },
  ];
  window.DS_TEAM = T;

  const I = window.DS_ICON;
  window.DS_MEMBER_CARD = (m, i, extra) =>
    `<button class="member reveal d${(i % 4) + 1} ${extra || ""}" data-i="${T.indexOf(m)}" data-g="${m.g}" aria-label="Read ${m.n}'s profile">
      <div class="ph"><img src="assets/team/${m.img}" alt="${m.n}, ${m.r}" loading="lazy"></div>
      <div class="info"><div><h4>${m.n}</h4><p>${m.r}</p></div><span class="plus">${I("plus")}</span></div>
    </button>`;

  // Modal (created once)
  let modal;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `<div class="modal-box"><button class="modal-close" aria-label="Close">${I("x")}</button><div class="mph"><img alt=""></div><div class="mbody"></div></div>`;
    document.body.appendChild(modal);
    const close = () => { modal.classList.remove("open"); document.body.style.overflow = ""; };
    modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".modal-close")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    return modal;
  }
  window.DS_BIND_TEAM = root => {
    root.addEventListener("click", e => {
      const b = e.target.closest(".member"); if (!b) return;
      const m = T[+b.dataset.i], md = ensureModal();
      md.querySelector(".mph img").src = "assets/team/" + m.img;
      md.querySelector(".mph img").alt = m.n;
      md.querySelector(".mbody").innerHTML = `<span class="eyebrow">${m.r}</span><h3>${m.n}</h3>${m.b.map(p => `<p>${p}</p>`).join("")}
        <a class="btn btn-primary btn-sm" href="contact.html" style="margin-top:10px">Work with our team ${I("arrow")}</a>`;
      md.classList.add("open"); document.body.style.overflow = "hidden";
      md.querySelector(".modal-close").focus();
    });
  };
})();
