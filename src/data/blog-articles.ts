export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "shopify-headless-development-guide",
    category: "SHOPIFY",
    title: "A Beginner's Guide to Shopify Headless Development",
    description:
      "Fondasi teknis untuk membuat storefront Shopify yang cepat, modular, dan siap scale.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    publishDate: "Dec 22, 2025",
    content: [
      "Headless Shopify memberi kebebasan penuh untuk membangun pengalaman belanja yang lebih cepat dan lebih fleksibel dibanding tema tradisional.",
      "Dengan stack modern seperti Next.js dan Storefront API, kamu bisa optimalkan performa, SEO, dan personalisasi tanpa mengorbankan maintainability.",
      "Mulai dari fondasi komponen reusable, desain sistem konsisten, lalu lanjutkan ke strategi data fetching yang efisien agar storefront tetap responsif saat traffic naik.",
    ],
  },
  {
    slug: "shopify-conversion-performance-checklist",
    category: "CONVERSION",
    title: "The Ultimate Checklist for Shopify Conversion Performance",
    description:
      "Checklist praktis untuk meningkatkan performa UX dan conversion rate di halaman produk.",
    image:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=1400&q=80",
    publishDate: "Nov 11, 2025",
    content: [
      "Optimasi conversion dimulai dari kecepatan halaman. Setiap detik loading yang dipangkas bisa berdampak langsung pada revenue.",
      "Pastikan struktur product page jelas: value proposition kuat, trust signal terlihat, CTA tegas, dan friction checkout seminimal mungkin.",
      "Lakukan iterasi berbasis data lewat heatmap, event tracking, dan A/B testing agar keputusan desain selalu terukur.",
    ],
  },
  {
    slug: "design-systems-for-shopify-growth",
    category: "ECOMMERCE",
    title: "Design Systems for High-Growth Shopify Stores",
    description:
      "Best practice membangun design system yang konsisten untuk scaling brand commerce.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    publishDate: "Oct 9, 2025",
    content: [
      "Design system membantu tim bergerak cepat tanpa kehilangan konsistensi visual dan kualitas experience.",
      "Mulai dari token warna, tipografi, spacing, hingga komponen UI inti seperti card, form, dan navigation untuk menjaga coherence antar halaman.",
      "Di Shopify, sistem yang solid membuat pengembangan campaign, landing page, dan fitur baru jauh lebih efisien sekaligus menjaga identitas brand.",
    ],
  },
];
