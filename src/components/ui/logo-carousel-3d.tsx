"use client";

import Image, { type StaticImageData } from "next/image";
import styles from "./logo-carousel-3d.module.css";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface LogoItem {
  src: string | StaticImageData;
  alt: string;
}

interface LogoCarousel3DProps {
  logos?: LogoItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rings?: 1 | 2 | 3;
}

/* ------------------------------------------------------------------ */
/*  Constants — must stay in sync with the CSS face width             */
/* ------------------------------------------------------------------ */

/** Number of logo panels arranged around the cylinder. */
const FACES_PER_RING = 12;

/**
 * Cylinder radius — how far each face is from the center.
 * 420px creates a compact cylinder with a tight rotation.
 */
const RADIUS = 420;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function buildRingLogos(
  logos: LogoItem[],
  offset: number,
): LogoItem[] {
  if (logos.length === 0) return [];
  return Array.from({ length: FACES_PER_RING }, (_, i) => {
    const index = (i + offset) % logos.length;
    return logos[index]!;
  });
}

/* ------------------------------------------------------------------ */
/*  Placeholders                                                      */
/* ------------------------------------------------------------------ */

const placeholderLogos: LogoItem[] = Array.from({ length: 10 }, (_, i) => ({
  src: "",
  alt: `Logo ${i + 1}`,
}));

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function LogoCarousel3D({
  logos,
  eyebrow = "TECH STACK",
  title = "Tools & Technologies",
  subtitle = "The platforms, frameworks, and tools powering every project.",
  rings = 3,
}: LogoCarousel3DProps) {
  const effectiveLogos =
    logos && logos.length > 0 ? logos : placeholderLogos;
  const ringCount = Math.max(1, Math.min(3, rings));

  // Offset per ring so logos don't vertically align across rows
  const ringOffsets = [0, 4, 8];

  return (
    <section id="logo-carousel" className={styles.carouselSection}>
      {/* Ambient glow blobs */}
      <div className={styles.glowOrb1} aria-hidden="true" />
      <div className={styles.glowOrb2} aria-hidden="true" />
      <div className={styles.glowOrb3} aria-hidden="true" />

      {/* Header */}
      <div className={`container ${styles.sectionHeader}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </div>

      {/* 3D Cylinder rings */}
      <div className={styles.cylinderStage}>
        {Array.from({ length: ringCount }).map((_, ringIndex) => {
          const offset = ringOffsets[ringIndex] ?? 0;
          const ringLogos = buildRingLogos(effectiveLogos, offset);
          const angleStep = 360 / FACES_PER_RING;

          return (
            <div className={styles.cylinderRing} key={ringIndex}>
              <div className={styles.cylinderScene}>
                {ringLogos.map((logo, faceIndex) => {
                  const angle = angleStep * faceIndex;
                  const transform = `rotateY(${angle}deg) translateZ(${RADIUS}px)`;

                  return logo.src ? (
                    <div
                      className={styles.cylinderFace}
                      key={`${ringIndex}-${faceIndex}`}
                      style={{ transform }}
                    >
                      <Image
                        className={styles.logoImage}
                        src={logo.src}
                        alt={logo.alt}
                        width={160}
                        height={50}
                        sizes="160px"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className={styles.cylinderFacePlaceholder}
                      key={`${ringIndex}-${faceIndex}`}
                      style={{ transform }}
                    >
                      <span className={styles.placeholderText}>
                        {logo.alt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Floor reflection glow */}
        <div className={styles.reflectionGlow} aria-hidden="true" />
      </div>
    </section>
  );
}
