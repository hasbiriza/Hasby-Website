"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = (formData.get("content") as string) || null;
  const techStack = formData.get("techStack") as string;
  const category = (formData.get("category") as string) || "shopify";
  const client = (formData.get("client") as string) || null;
  const role = (formData.get("role") as string) || null;
  const duration = (formData.get("duration") as string) || null;
  const highlights = (formData.get("highlights") as string) || null;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const featured = formData.get("featured") === "on";
  const order = parseInt(formData.get("order") as string) || 0;

  // Convert comma-separated techStack to JSON array
  const techStackArray = techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Convert newline-separated highlights to JSON array
  const highlightsArray = highlights
    ? highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean)
    : null;

  await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      description,
      content,
      techStack: JSON.stringify(techStackArray),
      category,
      client,
      role,
      duration,
      highlights: highlightsArray ? JSON.stringify(highlightsArray) : null,
      liveUrl,
      repoUrl,
      featured,
      order,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = (formData.get("content") as string) || null;
  const techStack = formData.get("techStack") as string;
  const category = (formData.get("category") as string) || "shopify";
  const client = (formData.get("client") as string) || null;
  const role = (formData.get("role") as string) || null;
  const duration = (formData.get("duration") as string) || null;
  const highlights = (formData.get("highlights") as string) || null;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const featured = formData.get("featured") === "on";
  const order = parseInt(formData.get("order") as string) || 0;

  const techStackArray = techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const highlightsArray = highlights
    ? highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean)
    : null;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      description,
      content,
      techStack: JSON.stringify(techStackArray),
      category,
      client,
      role,
      duration,
      highlights: highlightsArray ? JSON.stringify(highlightsArray) : null,
      liveUrl,
      repoUrl,
      featured,
      order,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}
