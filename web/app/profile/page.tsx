"use client";

import { useState } from "react";
import Link from "next/link";

// ── Collapsible ───────────────────────────────────────────

function Collapsible({
  header,
  children,
  defaultOpen = false,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
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

// ── Page ─────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16" style={{ color: "var(--fg)" }}>

      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight">Chaitanya Mukkamala</h1>
        <p className="mt-2 text-base" style={{ color: "var(--fg-muted)" }}>
          Product Leader · AI/LLM Platforms · Toronto, Canada
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          I build AI platforms that don&apos;t just solve today&apos;s problem — they create leverage
          for the next ten. My focus is finding where a well-placed system changes behavior at scale.
          Every roadmap I own is a hypothesis about where the market is going, not where it&apos;s been.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#171717] transition-opacity hover:opacity-85"
            style={{ background: "var(--accent)" }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Resume
          </a>
          <a
            href="https://linkedin.com/in/ramachaitanya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* ── What I Do ─────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          What I Do
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border p-5"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="mb-4" style={{ color: "var(--accent)" }}>
                {p.icon}
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Where I've Done It ────────────────────────── */}
      <section className="mb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Where I&apos;ve Done It
        </h2>
        <div className="space-y-3">
          {COMPANIES.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <Collapsible
                defaultOpen={c.name === "Amazon"}
                header={
                  <div className="flex w-full items-center justify-between px-5 py-4 pr-4">
                    <div>
                      <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{c.name}</span>
                      <span className="ml-3 text-xs" style={{ color: "var(--fg-subtle)" }}>{c.role}</span>
                    </div>
                    <span className="shrink-0 text-xs" style={{ color: "var(--fg-subtle)" }}>{c.period}</span>
                  </div>
                }
              >
                <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "var(--border)" }}>
                  <ul className="space-y-2">
                    {c.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Collapsible>
            </div>
          ))}
        </div>
      </section>

      {/* ── How I Think ──────────────────────────────── */}
      <section>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          How I Think
        </h2>
        <blockquote
          className="border-l-2 pl-5 text-sm leading-relaxed italic"
          style={{ borderColor: "var(--accent)", color: "var(--fg-muted)" }}
        >
          &ldquo;Turns ambiguity into clarity while guiding product pivots and aligning
          cross-organizational teams around focused, customer-centric strategies.&rdquo;
        </blockquote>
        <div className="mt-6 space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          <p>
            I believe the most durable products are built at the intersection of deep customer
            understanding and structural business leverage. I don&apos;t optimize for feature count —
            I optimize for systems that compound.
          </p>
          <p>
            At Amazon, I own platforms that influence $46B+ in revenue not because we built the most
            features, but because we built the right primitives: flexible enough to serve 50+ teams,
            opinionated enough to enforce quality at scale.
          </p>
          <p>
            I lead teams the same way — by setting a high bar, building clarity, then getting out of
            the way. The best engineers I&apos;ve led have gone on to get promoted, not because I
            managed them closely, but because I gave them real problems to solve.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/writing" className="text-sm font-medium transition-colors link-accent">
            Read my writing →
          </Link>
        </div>
      </section>

      {/* ── How I Operate ────────────────────────────── */}
      <section className="mt-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          How I Operate
        </h2>
        <div className="space-y-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>&ldquo;{p.title}&rdquo;</p>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What I'd Build Next ───────────────────────── */}
      <section className="mt-16">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          What I&apos;d Build Next
        </h2>
        <p className="mb-8 text-xs" style={{ color: "var(--fg-subtle)" }}>
          Problems I&apos;m thinking about. Not specs — hypotheses.
        </p>
        <div className="space-y-4">
          {BUILD_IDEAS.map((idea) => (
            <div
              key={idea.title}
              className="rounded-2xl border p-5"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{idea.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{idea.body}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

// ── Data ──────────────────────────────────────────────────

const PILLARS = [
  {
    title: "AI/LLM Product Strategy",
    description:
      "Translate LLM capabilities into personalization and automation platforms that drive measurable revenue growth — not demos.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <path d="M17 2l5 5-5 5" />
      </svg>
    ),
  },
  {
    title: "Platform Architecture at Scale",
    description:
      "Design systems that handle 100B+ API calls annually. Lead platforms from 0→1 concept through global rollout with engineering and science teams.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="3" width="6" height="6" rx="1" />
        <rect x="16" y="3" width="6" height="6" rx="1" />
        <path d="M5 9v3M12 9v3M19 9v3M5 12h14M12 15v6" />
      </svg>
    ),
  },
  {
    title: "Cross-Org Leadership",
    description:
      "Align product, engineering, and science teams across complex organizations. Hire selectively, develop intentionally, and maintain a high performance bar.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3" />
        <circle cx="5" cy="17" r="2" />
        <circle cx="19" cy="17" r="2" />
        <path d="M12 11v3M12 14l-5 2M12 14l5 2" />
      </svg>
    ),
  },
];

const COMPANIES = [
  {
    name: "Amazon",
    role: "Product Lead",
    period: "2022 – Present",
    bullets: [
      "Leading 2026 strategic pivot of AI/LLM-powered full-funnel recommendations — $950M revenue target, eliminating 100K+ manual hours.",
      "Expanded advertiser recommendations across four new ad product lines ($30B revenue base), directing 10+ cross-functional teams toward $650M+ incremental impact.",
      "Pioneered 0→1 development of Flexible Reporting — elevated to S-Team goal with projected $1B revenue impact in 2026.",
      "Directed platform scaling to 26B+ async reports annually with sub-2-second sync latency across 50+ teams.",
    ],
  },
  {
    name: "Nuvalence (Acquired by EY)",
    role: "Senior Technical PM",
    period: "2021 – 2022",
    bullets: [
      "Promoted to Senior TPM within six months; scaled team from 5 to 12 engineers.",
      "Pivoted search and location platform strategy — 12x traffic increase in one quarter.",
      "Reduced time-to-market from 3 months to 3 weeks; improved component availability 83% QoQ.",
    ],
  },
  {
    name: "Thomson Reuters",
    role: "Technical Product Manager",
    period: "2019 – 2021",
    bullets: [
      "Owned API Platform portfolio across 5 products — 100B+ API calls/year, $100M+ revenue, $4M budget.",
      "Accelerated API velocity 24% and reduced release cycles from 7 days to 2 hours through automation.",
    ],
  },
  {
    name: "CommScope (formerly TE Connectivity)",
    role: "Global Analyst, Strategy & Products",
    period: "2014 – 2017",
    bullets: [
      "Advised C-suite on 5G, IoT, and virtualization product strategy.",
      "Launched e-commerce portfolio across six countries — $15M+ new revenue from 200+ SKUs.",
    ],
  },
  {
    name: "Abbott Healthcare",
    role: "Manager, Strategy",
    period: "2018",
    bullets: [
      "Boosted stent margins 15%, grew infant formula sales 5%, cut costs 30%.",
    ],
  },
  {
    name: "Software Engineering",
    role: "Various",
    period: "2007 – 2013",
    bullets: [
      "6 years building SaaS applications and scaled platforms handling 1M+ users.",
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Write the brief before the meeting.",
    body: "I document the problem, hypothesis, and key decisions before any alignment meeting. The meeting is for debate, not discovery. If I can't write it down, I don't understand it well enough yet.",
  },
  {
    title: "Prototype in the first week. Strategy decks without artifacts are fiction.",
    body: "Every roadmap item I own starts with the smallest possible test. I build to learn, not to ship. The artifact — however rough — forces clarity that slides never do.",
  },
  {
    title: "Own the portfolio, not just the product.",
    body: "My roadmaps account for the full system: adjacent teams, downstream dependencies, and the five things that would make this fail. A product that succeeds in isolation and breaks the platform isn't a win.",
  },
  {
    title: "Hire for judgment, develop for promotion.",
    body: "I hire people who can make hard calls without me, then invest in making sure they have what they need to grow. Two of my direct reports earned promotions last year. That's the job.",
  },
  {
    title: "Align up before you align sideways.",
    body: "Executive sponsorship isn't a nice-to-have — it's a prerequisite. I secure it before I need it. The roadmap that surprises a VP at the QBR is already dead.",
  },
  {
    title: "Measure the thing that changes behavior, not the thing that looks good.",
    body: "Not just success metrics — the specific signal that tells me whether the product is doing what customers actually needed it to do. Vanity metrics are for decks. Behavioral signals are for decisions.",
  },
];

const BUILD_IDEAS = [
  {
    title: "Agentic QBR generation",
    body: "An agent that ingests Slack threads, Jira velocity data, and dashboard metrics to auto-draft quarterly business reviews. Saves 40+ hours per product team per quarter. The data already exists — the bottleneck is synthesis.",
  },
  {
    title: "Prompt version control for enterprise AI teams",
    body: "A platform-level approach to managing prompt evolution across large engineering orgs. Like Git for AI behavior — with rollback, A/B testing, and attribution. Every company building on LLMs will need this within 18 months.",
  },
  {
    title: "AI-native advertiser intelligence",
    body: "Move from reactive 'here are your stats' reporting to proactive 'here's what you should change and why' recommendations with predicted impact. The reporting platform exists. The reasoning layer is the gap.",
  },
];
