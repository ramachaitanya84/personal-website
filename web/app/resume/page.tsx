"use client";

import { useState } from "react";

type Lens = "strategist" | "builder" | "leader";
type TaggedBullet = { text: string; lenses: Lens[] };

// ── Collapsible ───────────────────────────────────────────

function Collapsible({
  header,
  children,
  defaultOpen = true,
  headerClass = "",
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerClass?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between text-left ${headerClass}`}
      >
        {header}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--fg-subtle)" }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Lens filter ───────────────────────────────────────────

const LENSES: { key: Lens | "all"; label: string; description: string }[] = [
  { key: "all",        label: "Full View",      description: "Complete career history" },
  { key: "strategist", label: "As a Strategist", description: "Business decisions, revenue impact, market positioning" },
  { key: "builder",    label: "As a Builder",    description: "0→1 builds, technical architecture, shipping at scale" },
  { key: "leader",     label: "As a Leader",     description: "Team scaling, hiring, mentoring, org design" },
];

// ── Page ─────────────────────────────────────────────────

export default function ResumePage() {
  const [lens, setLens] = useState<Lens | "all">("all");
  const activeLens = LENSES.find((l) => l.key === lens)!;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16" style={{ color: "var(--fg)" }}>

      {/* ── Download ──────────────────────────────────── */}
      <div className="mb-10 flex justify-end">
        <a
          href="/Resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#171717] shadow-sm transition-opacity hover:opacity-85"
          style={{ background: "var(--accent)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download PDF
        </a>
      </div>

      {/* ── Lens filter ───────────────────────────────── */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {LENSES.map((l) => {
            const active = lens === l.key;
            return (
              <button
                key={l.key}
                type="button"
                onClick={() => setLens(l.key)}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150"
                style={
                  active
                    ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#171717" }
                    : { background: "transparent", borderColor: "var(--border)", color: "var(--fg-muted)" }
                }
              >
                {l.label}
              </button>
            );
          })}
        </div>
        {lens !== "all" && (
          <p className="mt-3 text-xs" style={{ color: "var(--fg-subtle)" }}>
            Highlighting: {activeLens.description}
          </p>
        )}
      </div>

      {/* ── Executive Summary ─────────────────────────── */}
      <section>
        <Collapsible
          headerClass="group"
          header={
            <div className="flex-1">
              <h1 className="text-2xl font-semibold tracking-tight">Executive Summary</h1>
              <div className="mt-1 h-px" style={{ background: "var(--border)" }} />
            </div>
          }
        >
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Product leader with 17 years of experience driving AI-powered innovation, scaling enterprise
            platforms, and transforming ambiguous problem spaces into measurable growth engines. Owns product
            strategy, roadmap prioritization, and cross-organizational investment decisions for AI-driven
            platforms operating at global scale, influencing portfolios exceeding $46B and guiding high-impact
            product pivots. Leads and scales product, engineering, and data teams by hiring, developing, and
            promoting talent while enforcing a high-performance bar.
          </p>
        </Collapsible>
      </section>

      {/* ── Skills ────────────────────────────────────── */}
      <section className="mt-14">
        <Collapsible
          header={
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
              <div className="mt-1 h-px" style={{ background: "var(--border)" }} />
            </div>
          }
        >
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SKILLS.map((skill) => (
              <div key={skill.title}>
                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{skill.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{skill.description}</p>
              </div>
            ))}
          </div>
        </Collapsible>
      </section>

      {/* ── Work Experience ───────────────────────────── */}
      <section className="mt-14">
        <Collapsible
          header={
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight">Work Experience</h2>
              <div className="mt-1 h-px" style={{ background: "var(--border)" }} />
            </div>
          }
        >
          <div className="mt-8 space-y-10">
            {EXPERIENCE.map((company) => (
              <Collapsible
                key={company.name}
                header={
                  <div className="flex flex-1 items-baseline justify-between pr-3">
                    <div>
                      <span className="text-base font-semibold">{company.name}</span>
                      {company.location && (
                        <span className="ml-2 text-sm" style={{ color: "var(--fg-subtle)" }}>{company.location}</span>
                      )}
                    </div>
                    <span className="shrink-0 text-sm" style={{ color: "var(--fg-subtle)" }}>{company.period}</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-6 border-l pl-4" style={{ borderColor: "var(--border)" }}>
                  {company.roles.map((role) => (
                    <Collapsible
                      key={role.title}
                      header={
                        <div className="flex flex-1 items-baseline justify-between pr-3">
                          <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{role.title}</p>
                          {role.period && (
                            <span className="shrink-0 text-xs" style={{ color: "var(--fg-subtle)" }}>{role.period}</span>
                          )}
                        </div>
                      }
                    >
                      {role.summary && (
                        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{role.summary}</p>
                      )}
                      {role.bullets && role.bullets.length > 0 && (
                        <ul className="mt-2.5 space-y-2">
                          {role.bullets.map((b, i) => {
                            const dimmed = lens !== "all" && !b.lenses.includes(lens as Lens);
                            return (
                              <li
                                key={i}
                                className="flex gap-2 text-sm leading-relaxed transition-opacity duration-200"
                                style={{
                                  color: "var(--fg-muted)",
                                  opacity: dimmed ? 0.2 : 1,
                                }}
                              >
                                <span
                                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full transition-colors duration-200"
                                  style={{ background: dimmed ? "var(--fg-subtle)" : "var(--accent)" }}
                                />
                                {b.text}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </Collapsible>
                  ))}
                </div>
              </Collapsible>
            ))}
          </div>
        </Collapsible>
      </section>

    </main>
  );
}

// ── Data ──────────────────────────────────────────────────

const SKILLS = [
  { title: "Product Strategy & Portfolio Ownership",   description: "Own product strategy and investment decisions across platforms influencing $46B+ in revenue." },
  { title: "AI/LLM Product Innovation & Scale",        description: "Translate LLM capabilities into personalization and automation platforms that drive revenue growth." },
  { title: "Enterprise & API Platforms",               description: "Lead platforms operating at 100B+ API calls and 26B+ reports annually with a global reach." },
  { title: "Executive & C-Suite Influence",            description: "Shape executive narratives and secure VP/SVP sponsorship for multi-year strategic initiatives." },
  { title: "Cross-Organizational Alignment",           description: "Align product, engineering, and science teams across complex organizations." },
  { title: "Team Growth & Development",                description: "Scale high-performing teams, hire selectively, and coach talent to promotion." },
];

const EXPERIENCE = [
  {
    name: "Amazon", location: "Toronto, Canada", period: "2022 – Present",
    roles: [
      {
        title: "Product Lead – AI/LLM-Powered Advertiser Recommendations",
        period: "2024 – Present",
        summary: "Accountable for multi-year product strategy and cross-organizational investment decisions for AI/LLM-powered advertiser recommendations.",
        bullets: [
          { text: "Leading 2026 strategic pivot and global rollout of AI/LLM-powered full-funnel recommendations, targeting $950M in annual revenue while eliminating 100K+ manual hours.", lenses: ["strategist", "builder"] },
          { text: "Expanded advertiser recommendations across four new ad product lines ($30B revenue base), directing 10+ cross-functional teams to unlock $650M+ incremental revenue impact.", lenses: ["strategist"] },
          { text: "Led and developed 4 engineers and 2 data scientists in a matrix structure, driving execution alignment and delivery outcomes, including 2 promotions.", lenses: ["leader"] },
          { text: "Directed and aligned 10+ PMs across interconnected roadmaps, enforcing ownership clarity and delivery standards.", lenses: ["leader"] },
        ] as TaggedBullet[],
      },
      {
        title: "Product Lead – Advertiser Reporting Platform",
        period: "2022 – 2024",
        summary: "Owned long-term platform strategy for Amazon Ads Reporting, including roadmap definition, architectural direction, and cross-organizational prioritization.",
        bullets: [
          { text: "Pioneered 0→1 development of Flexible Reporting — scaled MVP, secured VP-level sponsorship, and elevated to a 2025 S-Team goal with projected $1B revenue impact in 2026.", lenses: ["builder", "strategist"] },
          { text: "Directed platform scaling supporting 26B+ async reports annually with sub-2-second sync latency.", lenses: ["builder"] },
          { text: "Defined mission-critical cross-org initiative across five teams to accelerate metrics launch timelines from 16 weeks to 6 weeks.", lenses: ["strategist", "builder"] },
          { text: "Established reporting standards by defining tenets, prioritization frameworks, and operational mechanisms — enabling 97 new features across 50+ teams.", lenses: ["strategist", "leader"] },
          { text: "Contributed to hiring decisions for 2 PMs and 5 engineers; coached team members toward promotion through targeted development planning.", lenses: ["leader"] },
        ] as TaggedBullet[],
      },
    ],
  },
  {
    name: "Nuvalence LLC – Acquired by EY", location: "Toronto, Canada", period: "2021 – 2022",
    roles: [
      {
        title: "Senior Technical Product Manager – Common eXperience Platform",
        period: null,
        summary: "Promoted to Senior TPM within six months. Led and scaled a team from 5 to 12 engineers; coached 2 members to promotion.",
        bullets: [
          { text: "Pivoted search and location platform strategy by integrating context-aware technologies — 12x traffic increase within one quarter.", lenses: ["strategist", "builder"] },
          { text: "Established reusable platform libraries — reduced time-to-market from 3 months to 3 weeks, increasing component availability 83% QoQ.", lenses: ["builder"] },
          { text: "Defined platform governance models and partnered with engineering and UX to standardize frontend development.", lenses: ["builder", "leader"] },
          { text: "Interviewed 15+ PM candidates; contributed to hiring 4 PMs during rapid expansion.", lenses: ["leader"] },
        ] as TaggedBullet[],
      },
    ],
  },
  {
    name: "Thomson Reuters", location: "Toronto, Canada", period: "2019 – 2021",
    roles: [
      {
        title: "Technical Product Manager – API Platform & Service Mesh",
        period: null,
        summary: "Owned the API Platform portfolio across five products — 100B+ API calls/year, $100M+ revenue, $4M budget.",
        bullets: [
          { text: "Accelerated API velocity by 24% through platform strategy and execution across the API portfolio.", lenses: ["builder", "strategist"] },
          { text: "Streamlined deployment cycles through automation — reducing release time from 7 days to 2 hours.", lenses: ["builder"] },
          { text: "Secured 15% additional funding by aligning cross-functional stakeholders and senior leadership.", lenses: ["strategist"] },
        ] as TaggedBullet[],
      },
    ],
  },
  {
    name: "Abbott Healthcare", location: "Mumbai, India", period: "2018",
    roles: [
      {
        title: "Manager – Strategy",
        period: null,
        summary: "Managed a 6-member team advising senior leaders on product strategy and supply chain.",
        bullets: [
          { text: "Boosted margins for stents by 15% and increased infant formula sales by 5%, while cutting costs by 30%.", lenses: ["strategist"] },
        ] as TaggedBullet[],
      },
    ],
  },
  {
    name: "CommScope – formerly TE Connectivity", location: "Singapore", period: "2014 – 2017",
    roles: [
      {
        title: "Global Analyst – Strategy & Products",
        period: null,
        summary: "Advised C-suite on product strategy across 5G, IoT, and virtualization products.",
        bullets: [
          { text: "Developed 5G and virtualization products roadmap and financial modeling to identify growth opportunities.", lenses: ["strategist", "builder"] },
          { text: "Launched e-commerce portfolio across six countries, generating $15M+ in new revenue from 200+ SKUs.", lenses: ["builder", "strategist"] },
          { text: "Maximized revenue across fiber and copper with targeted GTM strategies balancing growth and retention.", lenses: ["strategist"] },
        ] as TaggedBullet[],
      },
    ],
  },
  {
    name: "Additional Experience", location: "", period: "2007 – 2013",
    roles: [
      {
        title: "Software Engineering",
        period: null,
        summary: "6 years building SaaS applications, managing teams of up to 5 engineers, and architecting platforms handling 1M+ users.",
        bullets: [] as TaggedBullet[],
      },
    ],
  },
];
