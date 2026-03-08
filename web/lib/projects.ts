import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  title: string;
  slug: string;
  tags: string[];
};

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  return fs
    .readdirSync(projectsDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(projectsDir, fileName);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);

      const title = typeof data.title === "string" ? data.title : fileName;
      const slug =
        typeof data.slug === "string"
          ? data.slug
          : fileName.replace(/\.md$/, "");
      const tags = Array.isArray(data.tags)
        ? data.tags.filter((tag): tag is string => typeof tag === "string")
        : typeof data.tags === "string"
          ? [data.tags]
          : [];

      return { title, slug, tags };
    });
}
