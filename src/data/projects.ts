import type { ProjectData } from "@/types";

/**
 * Static project data — akan dipindahkan ke database nanti
 */
export const projects: ProjectData[] = [
  {
    slug: "project-one",
    title: "Project One",
    description: "Deskripsi singkat tentang project pertama.",
    techStack: ["Next.js", "TypeScript", "Prisma"],
    featured: true,
    order: 1,
  },
  {
    slug: "project-two",
    title: "Project Two",
    description: "Deskripsi singkat tentang project kedua.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    featured: true,
    order: 2,
  },
];
