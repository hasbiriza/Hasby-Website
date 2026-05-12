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

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const tagSlugs = (formData.get("tags") as string) || "";

  const tagList = tagSlugs
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Upsert tags
  const tagConnections = [];
  for (const tagName of tagList) {
    const tag = await prisma.tag.upsert({
      where: { slug: slugify(tagName) },
      update: {},
      create: { name: tagName, slug: slugify(tagName) },
    });
    tagConnections.push({ id: tag.id });
  }

  await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      published,
      tags: { connect: tagConnections },
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const tagSlugs = (formData.get("tags") as string) || "";

  const tagList = tagSlugs
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const tagConnections = [];
  for (const tagName of tagList) {
    const tag = await prisma.tag.upsert({
      where: { slug: slugify(tagName) },
      update: {},
      create: { name: tagName, slug: slugify(tagName) },
    });
    tagConnections.push({ id: tag.id });
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      published,
      tags: { set: [], connect: tagConnections },
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}
