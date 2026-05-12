import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // --- Tags ---
  const tags = await Promise.all(
    [
      { name: "Shopify", slug: "shopify" },
      { name: "Liquid", slug: "liquid" },
      { name: "Next.js", slug: "nextjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodejs" },
      { name: "Performance", slug: "performance" },
      { name: "E-commerce", slug: "e-commerce" },
      { name: "API", slug: "api" },
      { name: "CSS", slug: "css" },
    ].map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      })
    )
  );

  console.log(`✅ ${tags.length} tags created`);

  // --- Projects ---
  const projectsData = [
    {
      title: "Abercrombie Indonesia — Custom Shopify Theme",
      slug: "abercrombie-id-theme",
      description:
        "Full custom Shopify theme development for Abercrombie Indonesia storefront with advanced collection filtering, optimized product grids, and responsive design.",
      content: `Developed a fully custom Shopify theme from scratch for Abercrombie Indonesia's online store. The project involved creating a premium shopping experience tailored to the Indonesian market.

Key technical work included building a custom collection filtering system using Globo filter integration with enhanced UX, implementing smart product card spreading algorithms to prevent adjacent duplicate products, and optimizing Core Web Vitals (LCP, CLS) for better SEO performance.

The theme features lazy-loaded product images, responsive grid layouts, custom Liquid snippets for dynamic content, and a mobile-first navigation system. Performance optimizations reduced initial page load by 40% through async font loading and strategic CSS delivery.`,
      techStack: JSON.stringify([
        "Shopify",
        "Liquid",
        "JavaScript",
        "CSS",
        "Globo Filter",
      ]),
      category: "shopify",
      client: "Abercrombie Indonesia",
      role: "Lead Developer",
      duration: "Ongoing",
      highlights: JSON.stringify([
        "40% improvement in page load performance",
        "Custom collection filtering with Globo integration",
        "Smart product card spreading algorithm",
        "Mobile-first responsive design",
        "Core Web Vitals optimization",
      ]),
      liveUrl: "https://www.abercrombie.id",
      featured: true,
      order: 1,
    },
    {
      title: "Shopify Storefront Performance Optimizer",
      slug: "shopify-performance-optimizer",
      description:
        "Performance audit and optimization toolkit for Shopify storefronts — reducing LCP, eliminating render-blocking resources, and improving Core Web Vitals scores.",
      content: `Built a systematic approach to auditing and optimizing Shopify storefront performance. This includes analyzing Lighthouse reports, identifying render-blocking resources like TypeKit fonts and heavy CSS frameworks, and implementing async loading strategies.

The project involved creating custom scripts for deferred font loading, optimizing Tailwind CSS delivery (keeping critical CSS synchronous while deferring non-critical styles), and implementing resource hints (preload, prefetch, preconnect) for third-party assets.

Results showed significant improvements in Largest Contentful Paint (LCP) and overall page speed scores across multiple Shopify stores.`,
      techStack: JSON.stringify([
        "Shopify",
        "Liquid",
        "JavaScript",
        "Lighthouse",
        "Web Performance",
      ]),
      category: "shopify",
      role: "Performance Engineer",
      duration: "2 months",
      highlights: JSON.stringify([
        "Improved LCP scores by 35-50% across stores",
        "Eliminated render-blocking font resources",
        "Optimized CSS delivery pipeline",
        "Created reusable performance audit checklist",
      ]),
      featured: true,
      order: 2,
    },
    {
      title: "Omni Dashboard — Shopify Store Management",
      slug: "omni-dashboard",
      description:
        "Full-stack dashboard application for managing Shopify store operations — product metafields analysis, anomaly detection, and bulk data management via Admin API.",
      content: `Developed a comprehensive dashboard application that connects to Shopify's Admin GraphQL API to provide store owners with deep insights into their product data and metafields.

Key features include a Metafield Anomalies module that loads product metafields, identifies empty or inconsistent data across products (processing batches of 3 at a time for rate limiting), and provides exportable reports. The dashboard also features a code-driven module registry system built with TypeScript and Prisma.

The application uses Zod for AI-driven schema validation, ensuring data integrity when processing bulk metafield operations. The modular architecture allows easy addition of new analysis tools.`,
      techStack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Prisma",
        "Shopify Admin API",
        "GraphQL",
        "Zod",
      ]),
      category: "web-app",
      role: "Full-Stack Developer",
      duration: "3 months",
      highlights: JSON.stringify([
        "Shopify Admin GraphQL API integration",
        "Metafield anomaly detection system",
        "Code-driven module registry with TypeScript",
        "Zod-powered schema validation",
        "Batch processing with rate limiting",
      ]),
      featured: true,
      order: 3,
    },
    {
      title: "Shopify Liquid Components Library",
      slug: "liquid-components-library",
      description:
        "Reusable Liquid component library for Shopify themes — collection filters, product counters, dynamic sections, and responsive grid systems.",
      content: `Created a library of reusable Liquid components and snippets designed to accelerate Shopify theme development. Each component follows Shopify's section architecture with customizable settings schemas.

Components include advanced collection filter UIs (with pill-based active filters, handling special characters like apostrophes), product grid systems with configurable layouts, dynamic section rendering, and responsive image components with lazy loading.

The library emphasizes clean, maintainable Liquid code with proper JSON schema definitions for theme editor customization. All components are tested across multiple Shopify themes and work with Online Store 2.0 architecture.`,
      techStack: JSON.stringify([
        "Shopify",
        "Liquid",
        "JavaScript",
        "CSS",
        "JSON Schema",
      ]),
      category: "shopify",
      role: "Theme Developer",
      duration: "Ongoing",
      highlights: JSON.stringify([
        "10+ reusable Liquid components",
        "Online Store 2.0 compatible",
        "Theme editor customizable via JSON schemas",
        "Handles edge cases like special characters in filters",
        "Cross-theme tested and documented",
      ]),
      featured: false,
      order: 4,
    },
    {
      title: "Headless Shopify Storefront with Next.js",
      slug: "headless-shopify-nextjs",
      description:
        "Headless e-commerce storefront powered by Shopify Storefront API and Next.js — server-rendered product pages, cart management, and checkout integration.",
      content: `Built a headless Shopify storefront using Next.js as the frontend framework, connected to Shopify's Storefront GraphQL API for product data, collections, and cart operations.

The architecture leverages Next.js App Router for server-side rendering of product and collection pages, ensuring fast initial loads and SEO-friendly markup. Client-side cart management handles add-to-cart, quantity updates, and seamless redirect to Shopify's hosted checkout.

The project demonstrates the flexibility of decoupling the storefront from Shopify's theme engine while maintaining all e-commerce functionality through Shopify's APIs.`,
      techStack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Shopify Storefront API",
        "GraphQL",
        "React",
        "CSS Modules",
      ]),
      category: "web-app",
      role: "Full-Stack Developer",
      duration: "2 months",
      highlights: JSON.stringify([
        "Shopify Storefront GraphQL API integration",
        "Server-rendered product pages with Next.js",
        "Client-side cart with checkout redirect",
        "SEO-optimized with structured data",
        "TypeScript strict mode throughout",
      ]),
      liveUrl: null,
      repoUrl: null,
      featured: false,
      order: 5,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log(`✅ ${projectsData.length} projects created`);

  // --- Sample Blog Post ---
  await prisma.post.upsert({
    where: { slug: "optimizing-shopify-core-web-vitals" },
    update: {},
    create: {
      title: "Optimizing Shopify Core Web Vitals: A Practical Guide",
      slug: "optimizing-shopify-core-web-vitals",
      excerpt:
        "Learn how to improve your Shopify store's LCP, CLS, and FID scores with practical optimization techniques.",
      content: `Core Web Vitals are critical ranking factors for Shopify stores. In this guide, I'll walk through the specific techniques I use to optimize Shopify storefronts for better performance scores.

## Identifying the Bottlenecks

The first step is always running a Lighthouse audit. For Shopify stores, the most common issues are:

1. **Render-blocking resources** — TypeKit fonts, heavy CSS frameworks loaded synchronously
2. **Large images** — Product images not properly sized or lazy-loaded
3. **Third-party scripts** — Analytics, chat widgets, and review apps

## Font Loading Strategy

One of the biggest wins is moving from synchronous to asynchronous font loading. For TypeKit fonts, this means using the \`font-display: swap\` strategy and loading the stylesheet asynchronously.

## CSS Delivery

If you're using Tailwind CSS or similar frameworks, keep the critical base styles synchronous but defer non-critical utility classes. This can reduce LCP by 30-40%.

## Results

After applying these optimizations across multiple stores, I consistently see 35-50% improvements in LCP and overall page speed scores.`,
      coverImage: null,
      published: true,
      tags: {
        connect: [{ slug: "shopify" }, { slug: "performance" }],
      },
    },
  });

  console.log("✅ 1 blog post created");
  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
