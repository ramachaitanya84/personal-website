import Link from "next/link";
import { getProjects } from "@/lib/projects";

export default function Page() {
  const projects = getProjects();

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
        <ul className="mt-6 space-y-6">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                className="text-base font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--fg)" }}
                href={`/projects/${project.slug}`}
              >
                {project.title}
              </Link>
              {project.tags.length > 0 && (
                <p className="mt-1 text-sm" style={{ color: "var(--fg-subtle)" }}>
                  {project.tags.join(" · ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
