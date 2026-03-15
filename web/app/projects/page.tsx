import Link from "next/link";
import { getProjects } from "@/lib/projects";

export default function Page() {
  const projects = getProjects();

  const liveTools = projects.filter((p) => p.liveUrl);
  const caseStudies = projects.filter((p) => !p.liveUrl);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
        Projects
      </h1>
      <div className="mt-1 h-px" style={{ background: "var(--border)" }} />

      {projects.length === 0 ? (
        <p className="mt-4 text-sm" style={{ color: "var(--fg-muted)" }}>
          No projects yet.
        </p>
      ) : (
        <div className="mt-8 space-y-12">
          {/* Live tools */}
          {liveTools.length > 0 && (
            <section>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--fg-subtle)" }}
              >
                Live tools
              </p>
              <div className="space-y-4">
                {liveTools.map((project) => (
                  <Link
                    key={project.slug}
                    href={project.liveUrl!}
                    className="group flex items-start justify-between rounded-xl p-5 transition-all"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-base font-semibold transition-colors group-hover:text-[var(--accent)]"
                          style={{ color: "var(--fg)" }}
                        >
                          {project.title}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            background: "var(--color-accent-muted)",
                            color: "var(--accent)",
                          }}
                        >
                          Live
                        </span>
                      </div>
                      {project.description && (
                        <p
                          className="mt-1 text-sm leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <p className="mt-2 text-xs" style={{ color: "var(--fg-subtle)" }}>
                          {project.tags.join(" · ")}
                        </p>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Case studies */}
          {caseStudies.length > 0 && (
            <section>
              {liveTools.length > 0 && (
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  Case studies
                </p>
              )}
              <ul className="space-y-6">
                {caseStudies.map((project) => (
                  <li key={project.slug}>
                    <Link
                      className="text-base font-semibold transition-opacity hover:opacity-70"
                      style={{ color: "var(--fg)" }}
                      href={`/projects/${project.slug}`}
                    >
                      {project.title}
                    </Link>
                    {project.description && (
                      <p className="mt-0.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <p className="mt-1 text-xs" style={{ color: "var(--fg-subtle)" }}>
                        {project.tags.join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}