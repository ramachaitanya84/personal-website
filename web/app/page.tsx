import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";
import avatar from '../public/avatar.png';

export default function HomePage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_320px]">

          {/* Text */}
          <div>
            <p className="mb-5 text-sm font-medium" style={{ color: "var(--fg-subtle)" }}>
              Chaitanya Mukkamala
            </p>
            <h1
              className="text-5xl font-bold tracking-tight sm:text-6xl"
              style={{ color: "var(--fg)", lineHeight: 1.05 }}
            >
              I build AI platforms
              <br />
              that scale to billions.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              From zero-to-one products to global platform scale —
              17 years of shipping what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#171717] transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)" }}
              >
                See My Work
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--border-hover)]"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div
            className="hidden overflow-hidden rounded-2xl border lg:block"
            style={{ borderColor: "var(--border)", boxShadow: "0 0 40px rgba(245,158,11,0.07)" }}
          >
            <Image
              src={avatar}
              alt="Chaitanya Mukkamala"
              width={320}
              height={400}
              className="w-full object-cover object-top"
              style={{ aspectRatio: "4/5" }}
              priority
            />
          </div>

        </div>
      </section>

      {/* ── Logo bar ──────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-4">
            {["Amazon", "EY · Nuvalence", "Thomson Reuters", "CommScope", "Abbott"].map((co) => (
              <span
                key={co}
                className="text-sm font-semibold tracking-wide"
                style={{ color: "var(--fg-subtle)" }}
              >
                {co}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Numbers strip ─────────────────────────────── */}
      <Reveal delay={100}>
        <section
          className="mx-auto max-w-5xl px-6 pb-16"
        >
          <div
            className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border sm:grid-cols-4"
            style={{ borderColor: "var(--border)", background: "var(--border)" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col px-6 py-5"
                style={{ background: "var(--bg-card)" }}
              >
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {s.value}
                </span>
                <span className="mt-1 text-xs leading-snug" style={{ color: "var(--fg-subtle)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Cards ─────────────────────────────────────── */}
      <Reveal delay={150}>
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--fg-subtle)" }}
          >
            Explore
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PreviewCard
              label="Projects"
              title="AI/LLM Platforms"
              description="Advertiser recommendations, reporting infrastructure, and API platforms at global scale."
              href="/projects"
            />
            <PreviewCard
              label="Writing"
              title="Product Thinking"
              description="Notes on AI product strategy, platform decisions, and building at scale."
              href="/writing"
            />
            <PreviewCard
              label="AI Chat"
              title="Ask Me Anything"
              description="An AI-powered interface over my resume and work — ask me anything."
              href="/profile"
              badge="Soon"
            />
          </div>
        </section>
      </Reveal>

      {/* ── Currently ─────────────────────────────────── */}
      <Reveal delay={200}>
        <section
          className="mx-auto max-w-5xl px-6 pb-28"
        >
          <div
            className="rounded-2xl border px-6 py-5"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                  color: "var(--accent)",
                }}
              >
                Currently
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Leading AI/LLM platform strategy at Amazon Ads — building full-funnel advertiser
                recommendation systems targeting $950M+ in annual revenue. Exploring agentic AI
                patterns and multi-step reasoning for automated decision-making. Writing about
                product strategy at scale and vibe producting.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}

// ── Data ──────────────────────────────────────────────────

const STATS = [
  { value: "$46B+",  label: "Revenue portfolio influenced" },
  { value: "100B+",  label: "API calls served annually" },
  { value: "26B+",   label: "Reports processed annually" },
  { value: "17 yrs", label: "Shipping what matters" },
];

// ── Components ────────────────────────────────────────────

function PreviewCard({
  label,
  title,
  description,
  href,
  badge,
}: {
  label: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          {label}
        </p>
        {badge && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              background: "color-mix(in srgb, var(--accent) 12%, transparent)",
              color: "var(--accent)",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-base font-semibold" style={{ color: "var(--fg)" }}>{title}</p>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{description}</p>
      <p
        className="mt-4 flex items-center gap-1 text-xs transition-all duration-150 group-hover:gap-2"
        style={{ color: "var(--accent)" }}
      >
        Explore
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </Link>
  );
}
