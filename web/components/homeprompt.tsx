"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Chip = { label: string; href: string };

const CHIPS: Chip[] = [
  { label: "Give me a summary of work experience", href: "/resume" },
  { label: "Give me highlights from the resume", href: "/resume" },
  { label: "Show me a list of all articles on AI", href: "/writing" },
  { label: "Give me a summary of all available projects", href: "/projects" },
  { label: "Show me a list of all articles on Product", href: "/writing" },
  { label: "Download a copy of resume", href: "/resume" },
];

export default function HomePrompt() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function routeFromQuery(query: string) {
    const s = query.toLowerCase();
    if (s.includes("resume") || s.includes("cv") || s.includes("experience") || s.includes("highlight")) return "/resume";
    if (s.includes("project")) return "/projects";
    if (s.includes("article") || s.includes("blog") || s.includes("writing") || s.includes("post")) return "/writing";
    if (s.includes("now") || s.includes("current")) return "/now";
    if (s.includes("profile") || s.includes("about")) return "/profile";
    return "/projects";
  }

  return (
    <div>
      <label className="sr-only" htmlFor="prompt">Ask</label>

      <div
        className="rounded-xl border px-4 py-3"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
      >
        <input
          id="prompt"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Hi..."
          className="w-full bg-transparent text-sm outline-none focus:ring-0"
          style={{ color: "var(--fg)" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) router.push(routeFromQuery(q));
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => router.push(c.href)}
            className="rounded-full border px-3 py-1.5 text-xs transition-colors"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
              color: "var(--accent)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
