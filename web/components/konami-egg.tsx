"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export default function KonamiEgg() {
  const [seq, setSeq] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (JSON.stringify(next) === JSON.stringify(KONAMI)) {
          setVisible(true);
          setTimeout(() => setVisible(false), 4000);
        }
        return next;
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={() => setVisible(false)}
    >
      <div
        className="rounded-2xl border px-10 py-8 text-center"
        style={{ background: "var(--bg-card)", borderColor: "var(--accent)" }}
      >
        <p className="mb-2 font-mono text-sm" style={{ color: "var(--fg-subtle)" }}>
          ↑↑↓↓←→←→BA
        </p>
        <p className="text-xl font-bold" style={{ color: "var(--fg)" }}>
          You found it.
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
          This site was built entirely with Claude Code.
          <br />
          Even this easter egg.
        </p>
        <p className="mt-4 text-xs" style={{ color: "var(--fg-subtle)" }}>
          click to dismiss
        </p>
      </div>
    </div>
  );
}
