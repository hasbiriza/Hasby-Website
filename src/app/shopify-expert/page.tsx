import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import ProcessTimeline from "@/components/ui/process-timeline";
import styles from "./page.module.css";

const processPhaseOne = [
  {
    title: "Proposal and Agreement",
    description:
      "After the initial consultation, we prepare a clear proposal covering scope, timeline, and expected business outcomes.",
  },
  {
    title: "Project Kickoff",
    description:
      "We align goals, milestones, communication channels, and the full execution roadmap before development starts.",
  },
  {
    title: "Design Phase",
    description:
      "Wireframes and interface concepts are crafted to ensure your Shopify store aligns with your brand direction.",
  },
  {
    title: "Development Phase",
    description:
      "Your Shopify implementation is built with a performance-first approach and frequent progress updates.",
  },
];

const processPhaseTwo = [
  {
    title: "Testing",
    description:
      "We run detailed QA checks for functionality, security, responsive behavior, and real-world buying flows.",
  },
  {
    title: "Client Feedback",
    description:
      "Your feedback is collected and prioritized to refine details before the store goes live.",
  },
  {
    title: "Launch and Deployment",
    description:
      "Final checks are completed before launch, followed by a controlled deployment with minimal risk.",
  },
  {
    title: "Client Training",
    description:
      "Your team receives practical training to manage products, campaigns, and essential day-to-day updates.",
  },
  {
    title: "Ongoing Support",
    description:
      "We continue to support growth iterations, performance tuning, and post-launch optimization.",
  },
];

export const metadata: Metadata = {
  title: "Shopify Expert",
  description:
    "Premium Shopify development process and end-to-end implementation by Muhammad Hasbiriza.",
};

export default function ShopifyExpertPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <p className={styles.kicker}>Shopify Expert Service</p>
            <h1 className={styles.heroTitle}>
              Premium Shopify Development for High-Growth Brands
            </h1>
            <p className={styles.heroDescription}>
              We build conversion-focused Shopify experiences with speed, visual precision,
              and scalable architecture. From strategy to launch, every step is designed
              to deliver measurable business impact.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryCta}>
                Start Your Project
              </Link>
              <Link href="/projects" className={styles.secondaryCta}>
                View Case Studies
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.mainImageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
                alt="Ecommerce strategy board"
                width={900}
                height={1100}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.floatingImageTop}>
              <Image
                src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80"
                alt="Shopify mobile commerce"
                width={520}
                height={620}
                className={styles.floatingImage}
              />
            </div>
            <div className={styles.floatingImageBottom}>
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80"
                alt="Professional consulting meeting"
                width={400}
                height={500}
                className={styles.floatingImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LandingAccordionItem />
        </div>
      </section>

      <ProcessTimeline phaseOne={processPhaseOne} phaseTwo={processPhaseTwo} />

      <section className="bg-white py-24 md:py-32 text-center text-gray-900 border-b border-gray-100 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-gray-800 leading-tight mb-8">
            Accelerate your ecommerce journey with<br className="hidden md:block"/> one of the highest ranking Shopify Experts<br className="hidden md:block"/> in the world.
          </h1>
          
          <div className="flex items-center gap-3 mb-10 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#95BF47" className="w-10 h-10 md:w-12 md:h-12"><path d="M388.3 118.8c-15.6-5.4-44.5-13.1-60.6-16-.9-25.5-16.1-84.3-51.4-102.8-21.7-11.4-47.5 4.3-51.7 6.4-13.6 6.8-24.9 59.9-25.2 60.1-23.7 2.2-61.9 8.2-70.1 11.2-12.7 4.7-12.2 15-12.2 15s-23.8 104.9-39 174.5c-11.6 52.8-26.6 119.5-26.5 120.4 2.8 11.9 11.6 17.5 28.5 18 19.3.6 47.9-3.7 75.3-8.8 29.5-5.5 61.8-11.6 86-12.4 12.1-.4 24.5-1.9 33.2-3.8 20.2-4.5 44-12.5 46.8-13.5 15.6-5.4 19.5-17.6 20.3-21.1 5.9-27.4 34.6-160.7 44.5-207.2 4.4-20.9 2-20-8-19.9zm-136.6 5.8c-15.4-2.8-31-4.8-43.2-5.9 2-18 10.4-56.7 15.3-70.6 5.3 4 15.3 12.1 27.9 76.5zm-59.5 242.2c-5.7 1-13.6 2.3-25.1 4-15 2.1-41.2 5.5-56.2 6.5-15.3 1.1-20.8-3.4-17.7-17 9.8-43.1 36.3-159.2 41.5-182 17.5-3.3 40.5-6.8 55-8.6 3.6 30.6-2.5 141.5-3.6 171.2 8.7-2 15.4-3.5 15.6-3.8-2.6 11.3-4.6 24.6-9.5 29.7zm173.8-204c-11.8 55.4-40.8 190.5-42.3 194.2-2.3 5.4-6.8 6.7-18.4 10.3-6.6 2.1-20.3 5.9-42.3 7 1.8-49.9 8.2-167 6.4-192.5 21 3.5 46 8.5 66.4 12.9 8.5 1.8 30.2 6.3 30.2 6.3z"/></svg>
            <span className="text-3xl md:text-[40px] font-bold tracking-tight text-gray-900 leading-none mt-1">shopify <span className="font-light italic text-gray-500">experts</span></span>
          </div>

          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#5d0bf0] text-white px-8 py-3.5 rounded-md font-semibold text-xs hover:bg-[#4b09c2] transition-colors mb-6 uppercase tracking-wider">
            Talk to us &rarr;
          </Link>
          
          <p className="text-gray-600 font-medium text-[15px]">Design. Development. Performance Marketing</p>
        </div>
      </section>

      <section className="relative w-full h-125 md:h-150 flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80" 
            alt="Shopify SEO Background" 
            fill 
            className="object-cover brightness-[0.6]" 
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-[42px] font-medium text-white mb-4 drop-shadow-md">Get your Free Shopify SEO audit</h2>
          <p className="text-white/90 text-xs md:text-sm font-medium mb-8 drop-shadow-md tracking-wide">For Shopify Advanced & Plus merchants.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors text-xs tracking-[0.2em] uppercase">
            More <span className="p-0.5 border border-current rounded-full inline-flex items-center justify-center w-4 h-4 text-[10px] leading-none mb-px">&gt;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
