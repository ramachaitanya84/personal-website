import Reveal from "@/components/reveal";

export default function WritingPage() {
  const [featured, ...rest] = NOTES;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          Notes
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
          Short, opinionated takes. No preamble — just the argument.
        </p>
      </div>

      {/* Featured */}
      <Reveal>
        <a
          href={`/writing/${featured.slug}`}
          className="group mb-10 block rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
              style={{
                background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                color: "var(--accent)",
              }}
            >
              Featured
            </span>
            {featured.tags.map((t) => (
              <span key={t} className="text-xs" style={{ color: "var(--fg-subtle)" }}>{t}</span>
            ))}
            <span className="ml-auto text-xs" style={{ color: "var(--fg-subtle)" }}>
              {featured.readTime} read
            </span>
          </div>
          <h2 className="text-xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
            {featured.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            {featured.thesis}
          </p>
          <p
            className="mt-4 flex items-center gap-1 text-xs transition-all duration-150 group-hover:gap-2"
            style={{ color: "var(--accent)" }}
          >
            Read
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </a>
      </Reveal>

      {/* Grid */}
      <Reveal delay={100}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((note) => (
            <a
              key={note.slug}
              href={`/writing/${note.slug}`}
              className="group block rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-2">
                  {note.tags.map((t) => (
                    <span key={t} className="text-xs" style={{ color: "var(--fg-subtle)" }}>{t}</span>
                  ))}
                </div>
                <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                  {note.readTime} read
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--fg)" }}>
                {note.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ color: "var(--fg-muted)" }}>
                {note.thesis}
              </p>
              <p
                className="mt-3 flex items-center gap-1 text-xs transition-all duration-150 group-hover:gap-2"
                style={{ color: "var(--accent)" }}
              >
                Read
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    </main>
  );
}

// ── Data (placeholder — replace with real articles) ────────

const NOTES = [
  {
    title: "Why most AI product roadmaps fail by Q2",
    thesis:
      "Because they're built around capabilities, not customer problems. The moment you start with 'what can the model do' instead of 'what does the customer need to stop doing manually', you've already lost the plot.",
    tags: ["Strategy", "AI"],
    readTime: "3 min",
    date: "Feb 2026",
    slug: "ai-roadmaps-fail",
    featured: true,
  },
  {
    title: "The platform trap: when abstraction becomes the product",
    thesis:
      "Every platform team eventually builds the same thing: a flexible, general-purpose system that solves nothing specific. Here's how to avoid building infrastructure nobody asked for.",
    tags: ["Building", "Strategy"],
    readTime: "4 min",
    date: "Jan 2026",
    slug: "platform-trap",
    featured: false,
  },
  {
    title: "Vibe Producting isn't a joke — it's a methodology",
    thesis:
      "The best product decisions I've made weren't from a framework. They came from developing taste, building conviction, and being willing to be wrong fast. That's Vibe Producting.",
    tags: ["Vibe Producting", "Leading"],
    readTime: "3 min",
    date: "Dec 2025",
    slug: "vibe-producting",
    featured: false,
  },
  {
    title: "The Director test: can your roadmap survive a CFO question?",
    thesis:
      "If you can't explain your top priority in terms of revenue, cost, or risk in under 60 seconds, you don't have a roadmap — you have a list. Here's the test I use before every QBR.",
    tags: ["Strategy", "Leading"],
    readTime: "3 min",
    date: "Nov 2025",
    slug: "director-test",
    featured: false,
  },
  {
    title: "How I run a 0→1 AI product without a research team",
    thesis:
      "Constraints force clarity. No research team means faster cycles, closer customer contact, and no committee to hide behind. Here's the playbook that got Flexible Reporting to an S-Team goal.",
    tags: ["Building", "AI"],
    readTime: "5 min",
    date: "Oct 2025",
    slug: "zero-to-one-ai",
    featured: false,
  },
];
