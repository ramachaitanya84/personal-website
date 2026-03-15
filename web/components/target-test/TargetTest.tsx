"use client";

import { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Lens = "Role scope fit" | "Domain alignment" | "Company stage match" | "Culture/pace fit" | "Red flags" | "Upside potential";

interface Score {
  dimension: Lens;
  score: number;
  explanation: string;
}

interface ApiResponse {
  needsInfo?: boolean;
  missingFields?: string[];
  followUpQuestion?: string | null;
  scores?: Score[];
  interrogation?: string[];
  summary?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TweakableInputs {
  role: string;
  stage: string;
  industry: string;
}

// ── Score card ─────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8
      ? "#22c55e"
      : score >= 6
      ? "#F59E0B"
      : score >= 4
      ? "#f97316"
      : "#ef4444";

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 flex-1 rounded-full"
        style={{ background: "var(--border)" }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="w-6 text-right text-sm font-semibold tabular-nums"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

function ScoreCard({ score }: { score: Score }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
          {score.dimension}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--fg-muted)" }}
        >
          / 10
        </span>
      </div>
      <ScoreBar score={score.score} />
      <p
        className="mt-2.5 text-xs leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        {score.explanation}
      </p>
    </div>
  );
}

// ── Tweakable inputs panel ─────────────────────────────────────────────────

function TweakPanel({
  values,
  onChange,
  onRescore,
  loading,
}: {
  values: TweakableInputs;
  onChange: (v: TweakableInputs) => void;
  onRescore: () => void;
  loading: boolean;
}) {
  const fields: { key: keyof TweakableInputs; label: string; placeholder: string }[] = [
    { key: "role", label: "Target role", placeholder: "e.g. Director of Product" },
    { key: "stage", label: "Company stage", placeholder: "e.g. Series B, public, early-stage" },
    { key: "industry", label: "Industry", placeholder: "e.g. enterprise SaaS, consumer, fintech" },
  ];

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--fg-subtle)" }}>
        Tweak &amp; re-score
      </p>
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="mb-1 block text-xs" style={{ color: "var(--fg-muted)" }}>
              {label}
            </label>
            <input
              type="text"
              value={values[key]}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
              onKeyDown={(e) => e.key === "Enter" && onRescore()}
            />
          </div>
        ))}
        <button
          onClick={onRescore}
          disabled={loading}
          className="w-full rounded-lg py-2 text-sm font-medium transition-opacity disabled:opacity-50"
          style={{ background: "var(--accent)", color: "#171717" }}
        >
          {loading ? "Scoring…" : "Re-score"}
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function TargetTest() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tweaks, setTweaks] = useState<TweakableInputs>({ role: "", stage: "", industry: "" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, result]);

  const callApi = async (msgs: Message[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/target-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `Request failed (${res.status})`);
        return null;
      }
      return data as ApiResponse;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error — is the dev server running?");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    const data = await callApi(newMessages);
    if (!data) return;

    if (data.needsInfo && data.followUpQuestion) {
      const assistantMsg: Message = {
        role: "assistant",
        content: data.followUpQuestion,
      };
      setMessages([...newMessages, assistantMsg]);
      setResult(null);
    } else if (data.scores) {
      setResult(data);
      // Seed tweaks from the conversation if possible
      setTweaks((prev) => ({
        role: prev.role || "",
        stage: prev.stage || "",
        industry: prev.industry || "",
      }));
    }
  };

  const handleRescore = async () => {
    if (loading) return;
    const tweakNote = [
      tweaks.role && `Target role: ${tweaks.role}`,
      tweaks.stage && `Company stage: ${tweaks.stage}`,
      tweaks.industry && `Industry preference: ${tweaks.industry}`,
    ]
      .filter(Boolean)
      .join(". ");

    if (!tweakNote) return;

    const userMsg: Message = {
      role: "user",
      content: `Please re-score with these updated inputs: ${tweakNote}`,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const data = await callApi(newMessages);
    if (data?.scores) setResult(data);
  };

  const overallScore =
    result?.scores
      ? Math.round(
          result.scores.reduce((s, d) => s + d.score, 0) / result.scores.length
        )
      : null;

  const hasResult = !!result?.scores;

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b px-6 py-4"
        style={{ background: "var(--nav-bg)", borderColor: "var(--border)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold" style={{ color: "var(--fg)" }}>
                Target Test
              </h1>
              <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                Job targeting evaluator — no sugarcoating
              </p>
            </div>
            {overallScore !== null && (
              <div className="text-right">
                <div
                  className="text-3xl font-bold tabular-nums"
                  style={{
                    color:
                      overallScore >= 8
                        ? "#22c55e"
                        : overallScore >= 6
                        ? "#F59E0B"
                        : "#ef4444",
                  }}
                >
                  {overallScore}
                  <span className="text-base font-normal" style={{ color: "var(--fg-subtle)" }}>
                    /10
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                  overall fit
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-8 space-y-8">

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="pt-12 text-center">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                🎯
              </div>
              <h2 className="mb-2 text-xl font-semibold" style={{ color: "var(--fg)" }}>
                Are you actually a fit?
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Describe your background and the role you&apos;re targeting. Be specific — company names, your domain, the role you want. The more context, the sharper the analysis.
              </p>
              <div
                className="mx-auto mt-6 max-w-lg rounded-xl p-4 text-left"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--fg-subtle)" }}>
                  Example prompt
                </p>
                <p className="text-sm italic" style={{ color: "var(--fg-muted)" }}>
                  &ldquo;I&apos;m a PM at Amazon Ads for 4 years, previously at a Series B startup. I want to apply for Director of Product at Stripe. I&apos;m most interested in their billing infrastructure team. I&apos;m worried my ads background might be too niche.&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? { background: "var(--accent)", color: "#171717" }
                    : { background: "var(--bg-card)", color: "var(--fg)", border: "1px solid var(--border)" }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full animate-bounce"
                      style={{
                        background: "var(--fg-subtle)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                  Analyzing…
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
            >
              {error}
            </div>
          )}

          {/* Results */}
          {hasResult && result && (
            <div className="space-y-6">
              {/* Summary */}
              {result.summary && (
                <div
                  className="rounded-xl p-5"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <p
                    className="mb-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    The verdict
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                    {result.summary}
                  </p>
                </div>
              )}

              {/* Score grid */}
              <div>
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  Fit breakdown
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.scores!.map((s) => (
                    <ScoreCard key={s.dimension} score={s} />
                  ))}
                </div>
              </div>

              {/* Interrogation */}
              {result.interrogation && result.interrogation.length > 0 && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid #ef4444",
                  }}
                >
                  <p
                    className="mb-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#ef4444" }}
                  >
                    The interrogation
                  </p>
                  <ul className="space-y-3">
                    {result.interrogation.map((challenge, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                          style={{ background: "#fef2f2", color: "#ef4444" }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                          {challenge}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tweak panel */}
              <TweakPanel
                values={tweaks}
                onChange={setTweaks}
                onRescore={handleRescore}
                loading={loading}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Chat input */}
      <div
        className="sticky bottom-0 border-t px-6 py-4"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="flex items-end gap-3 rounded-2xl p-3"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={
                messages.length === 0
                  ? "Describe your background and target role…"
                  : "Continue the conversation…"
              }
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm outline-none"
              style={{ color: "var(--fg)", maxHeight: "160px", lineHeight: "1.5" }}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-30"
              style={{ background: "var(--accent)" }}
              aria-label="Send"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#171717"
                className="h-4 w-4"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-xs" style={{ color: "var(--fg-subtle)" }}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}