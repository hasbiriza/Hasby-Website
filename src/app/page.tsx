import Image from "next/image";
import { readdirSync } from "node:fs";
import path from "node:path";
import ProcessTimeline from "@/components/ui/process-timeline";
import LogoCarousel3D from "@/components/ui/logo-carousel-3d";
import ProjectWorkGrid from "@/components/ui/project-work-grid";
import { projectCategories, shopifyProjects } from "@/data/work-projects";
import { toolLogos } from "@/data/tool-logos";
import styles from "./page.module.css";

const logoExtensions = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]);
const logoSlotCount = 12;

function getBrandLogoFiles() {
  const logoDirectory = path.join(process.cwd(), "public", "logo");

  try {
    return readdirSync(logoDirectory)
      .filter((fileName) => logoExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((first, second) => first.localeCompare(second));
  } catch {
    return [];
  }
}

function formatLogoAlt(fileName: string, index: number) {
  const cleanedName = path
    .parse(fileName)
    .name.replace(/-removebg-preview/gi, "")
    .replace(/^[a-f0-9]{12,}$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return cleanedName ? `${cleanedName} logo` : `Partner logo ${index + 1}`;
}

function buildLogoWall(files: string[]): string[] {
  const firstFile = files[0];

  if (!firstFile) {
    return [];
  }

  return Array.from(
    { length: logoSlotCount },
    (_, index) => files[index % files.length] ?? firstFile,
  );
}

function EmailLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 6.75h15v10.5h-15z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="m5.25 7.5 6.75 5.25 6.75-5.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.04 3.2C9.08 3.2 3.42 8.86 3.42 15.82c0 2.24.59 4.4 1.7 6.31L3.31 28.8l6.84-1.79a12.6 12.6 0 0 0 5.89 1.49h.01c6.96 0 12.62-5.66 12.62-12.62A12.56 12.56 0 0 0 16.04 3.2Zm0 23.16h-.01c-1.87 0-3.7-.5-5.3-1.45l-.38-.23-4.05 1.06 1.08-3.95-.25-.4a10.42 10.42 0 0 1-1.58-5.57c0-5.79 4.71-10.5 10.5-10.5 2.8 0 5.43 1.09 7.41 3.07a10.42 10.42 0 0 1 3.08 7.43c0 5.83-4.71 10.54-10.5 10.54Zm5.75-7.86c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.76.24 1.45.2 1.99.12.61-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37Z"
      />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm15.11 13.02H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.89 1.63-1.84 3.35-1.84 3.58 0 4.27 2.36 4.27 5.43v6.3Z"
      />
    </svg>
  );
}

function MediumLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.54 12a6.77 6.77 0 1 1-13.54 0 6.77 6.77 0 0 1 13.54 0Zm7.43 0c0 3.42-1.51 6.19-3.38 6.19-1.87 0-3.38-2.77-3.38-6.19s1.51-6.19 3.38-6.19c1.87 0 3.38 2.77 3.38 6.19ZM24 12c0 3.05-.53 5.53-1.19 5.53S21.62 15.05 21.62 12s.53-5.53 1.19-5.53S24 8.95 24 12Z"
      />
    </svg>
  );
}

const profileHighlights = [
  { value: "Shopify", label: "Storefront engineering" },
  { value: "Headless", label: "Modern commerce stack" },
  { value: "Conversion", label: "UX built for selling" },
  { value: "Apps Development", label: "Custom app builds" },
];

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

const contactLinks = [
  {
    label: "Email",
    href: "mailto:hasbiriza@gmail.com",
    icon: <EmailLogo />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/628812530224",
    external: true,
    icon: <WhatsAppLogo />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammadhasbiriza",
    external: true,
    icon: <LinkedInLogo />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@hasbiriza",
    external: true,
    icon: <MediumLogo />,
  },
];

export default function HomePage() {
  const brandLogoFiles = getBrandLogoFiles();
  const logoWall = buildLogoWall(brandLogoFiles);
  const logoRows = [logoWall, [...logoWall].reverse()];

  return (
    <>
      <section id="home" className={styles.hero}>
        <video
          className={styles.heroVideo}
          src="/download.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className={styles.heroShade} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>DRIVING DIGITAL COMMERCE</p>
            <h1 className={styles.heroTitle}>Imagine. Design. Build.</h1>
            <p className={styles.heroLead}>
              <span>Muhammad Hasbiriza</span>
              <span>Ecommerce Engineer</span>
            </p>
          </div>

          {logoWall.length > 0 ? (
            <div className={styles.logoMarquee} aria-label="Selected brand logos">
              {logoRows.map((row, rowIndex) => (
                <div
                  className={`${styles.logoRow} ${rowIndex === 1 ? styles.logoRowReverse : ""}`}
                  key={`logo-row-${rowIndex}`}
                >
                  <div className={styles.logoTrack}>
                    {[...row, ...row].map((fileName, index) => (
                      <div className={styles.logoSlot} key={`${rowIndex}-${fileName}-${index}`}>
                        <Image
                          className={styles.logoImage}
                          src={`/logo/${fileName}`}
                          alt={formatLogoAlt(fileName, index)}
                          width={180}
                          height={56}
                          sizes="180px"
                          loading={index < 6 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className={styles.pageSurface}>
            <section id="profile" className={`${styles.sectionAnchor} ${styles.profileBand}`}>
              <div className={`container ${styles.profileInner}`}>
                <div className={styles.profileCopy}>
                  <p className={styles.profileEyebrow}>End To End O2O With Shopify</p>
                  <p className={styles.profileKicker}>Software Engineer</p>
                  <h2 className={styles.profileTitle}>Muhammad Hasbiriza</h2>
                  <div className={styles.profilePill}>
                    <span>Specialization</span>
                    <strong>Ecommerce Engineer</strong>
                  </div>
                  <p className={styles.profileDescription}>
                    I build fast, elegant, conversion-focused Shopify experiences. From
                    landing pages to checkout, every touchpoint is designed to feel
                    premium and drive results.
                  </p>
              <div className={styles.profileActions}>
                <a className={styles.profilePrimary} href="#work">
                  Explore Work
                </a>
                <a className={styles.profileSecondary} href="#contact">
                  Start a Project
                </a>
              </div>
            </div>

            <div className={styles.profileStats} aria-label="Profile highlights">
              {profileHighlights.map((item) => (
                <article className={styles.profileStat} key={item.value}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LogoCarousel3D
          logos={toolLogos}
          eyebrow="TECH STACK"
          title="Tools & Technologies"
          subtitle="The platforms, frameworks, and tools powering every project."
          rings={3}
        />

        <section id="work" className={`${styles.sectionAnchor} ${styles.workBand}`}>
          <div className="container">
            <ProjectWorkGrid categories={projectCategories} projects={shopifyProjects} />
          </div>
        </section>

        <div id="process" className={`${styles.sectionAnchor} ${styles.processBand}`}>
          <ProcessTimeline phaseOne={processPhaseOne} phaseTwo={processPhaseTwo} />
        </div>

        <section id="contact" className={`${styles.sectionAnchor} ${styles.contactBand}`}>
          <div className={`container ${styles.contactPanel}`}>
            <div className={styles.contactIntro}>
              <p className={styles.eyebrow}>CONTACT</p>
              <h2>Let&apos;s build the next commerce experience.</h2>
              <p className={styles.contactLead}>
                Available for Shopify builds, storefront refinement, and ecommerce
                systems that need to feel precise from the first scroll.
              </p>
            </div>

            <div className={styles.contactGrid} aria-label="Contact channels">
              {contactLinks.map((contact) => (
                <a
                  className={styles.contactLink}
                  href={contact.href}
                  key={contact.label}
                  aria-label={contact.label}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer" : undefined}
                >
                  <span className={styles.contactIcon} aria-hidden="true">
                    {contact.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
