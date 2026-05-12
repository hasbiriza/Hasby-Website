"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  ArrowUpRight,
  BarChart3,
  Code2,
  Gauge,
  Globe,
  LifeBuoy,
  Megaphone,
  Palette,
  PenTool,
  ShoppingBag,
  Wrench,
} from "lucide-react";

type ShopifyService = {
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
};

const serviceItems: ShopifyService[] = [
  {
    title: "Shopify Theme Tweaks & Changes",
    description: "Need changes to your Shopify site? We can code literally anything into any Shopify theme.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    icon: Wrench,
  },
  {
    title: "Complete Redesign or Store Facelift",
    description: "We can give your store the overhaul it needs.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    icon: PenTool,
  },
  {
    title: "Shopify SEO & Content Marketing",
    description: "Crush the competition in Google with our SEO packages.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    icon: BarChart3,
  },
  {
    title: "Shopify Plus Support & Services",
    description: "A dedicated & experienced enterprise Shopify team.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    icon: Globe,
  },
  {
    title: "Monthly Shopify Support Retainers",
    description: "For those who need monthly support from us.",
    imageUrl:
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80",
    icon: Gauge,
  },
  {
    title: "Custom Shopify Development",
    description: "Whatever your development needs we have the skills.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    icon: Code2,
  },
  {
    title: "Migration to Shopify – Support & Planning",
    description: "We've migrated over 50 sites including a listed company to Shopify.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    icon: ArrowUpRight,
  },
  {
    title: "Shopify Audits & Consultancy",
    description: "For those who need advice & strategy.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    icon: LifeBuoy,
  },
  {
    title: "Custom Shopify App Development",
    description: "We develop custom apps for both private and commercial use.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    icon: AppWindow,
  },
  {
    title: "Paid Advertising & Data Feeds",
    description: "Your growth is only limited by your marketing.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    icon: Megaphone,
  },
  {
    title: "Custom Shopify Theme Development",
    description: "Custom designed Shopify themes are what we do best.",
    imageUrl:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
    icon: ShoppingBag,
  },
  {
    title: "Logo & Branding",
    description: "Logo & branding for Shopify stores.",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    icon: Palette,
  },
];

function ServiceCard({ title, description, imageUrl, icon: Icon }: ShopifyService) {
  return (
    <Link
      href="/shopify"
      className="group relative block min-h-[280px] overflow-hidden rounded-[18px] border border-white/10 bg-[#09111d] sm:min-h-[320px] lg:min-h-[350px]"
      aria-label={title}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,19,0.14)_0%,rgba(5,9,19,0.46)_48%,rgba(5,9,19,0.88)_100%)] transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(54,108,255,0.16)_0%,rgba(37,88,228,0.44)_48%,rgba(11,34,96,0.92)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,149,255,0.2),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute left-5 top-5 z-10 sm:left-6 sm:top-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-black/18 text-white backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200/40 group-hover:bg-blue-400/16 group-hover:text-blue-50">
          <Icon className="h-6 w-6" strokeWidth={1.7} />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        <h4 className="max-w-[14ch] text-[1.45rem] font-medium leading-tight tracking-[-0.03em] text-white transition-transform duration-300 group-hover:-translate-y-2 sm:text-[1.55rem]">
          {title}
        </h4>

        <p className="mt-3 text-base leading-7 text-white/88 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function LandingAccordionItem() {
  return (
    <section className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,#0a101b_0%,#070b12_100%)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-200/80">
            Shopify Experts
          </p>

          <h3 className="mx-auto mt-6 max-w-5xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-6xl">
            If you&apos;re ready to design, develop or scale on Shopify we have the solution.
          </h3>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceItems.map((item) => (
            <ServiceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
