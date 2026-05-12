/**
 * Shared TypeScript types and interfaces
 */

/** Navigation link item */
export interface NavItem {
  label: string;
  href: string;
}

/** Social media link */
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

/** Project data for static rendering (before DB migration) */
export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  content?: string;
  coverImage?: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
}

/** Homepage work filter categories */
export type WorkProjectCategory =
  | "Fashion & Lifestyle"
  | "Beauty & Wellness"
  | "Food & Beverage"
  | "Sports & Outdoor"
  | "Home Tech & Specialty";

/** Homepage Shopify work card */
export interface ShopifyProject {
  title: string;
  href: string;
  category: WorkProjectCategory;
  wordmark?: string;
  imageSrc?: string;
  logoSrc?: string;
}

/** Blog post data */
export interface PostData {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: TagData[];
}

/** Tag data */
export interface TagData {
  name: string;
  slug: string;
}

/** SEO metadata for pages */
export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
}
