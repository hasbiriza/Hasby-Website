"use client";

import { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./process-timeline.module.css";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  phaseOne: ProcessStep[];
  phaseTwo: ProcessStep[];
}

interface TimelineStepProps {
  step: ProcessStep;
  progress: MotionValue<number>;
  range: [number, number];
}

function TimelineStep({ step, progress, range }: TimelineStepProps) {
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(progress, range, [0.24, 1]);
  const y = useTransform(progress, range, [28, 0]);
  const scale = useTransform(progress, range, [0.97, 1]);
  const stemScale = useTransform(progress, range, [0, 1]);
  const dotScale = useTransform(progress, range, [0.7, 1]);
  const dotGlow = useTransform(
    progress,
    range,
    [
      "0 0 0 rgba(123, 185, 255, 0)",
      "0 0 0 12px rgba(123, 185, 255, 0.12)",
    ],
  );

  return (
    <m.article
      className={styles.stepCard}
      style={reduceMotion ? undefined : { opacity, y, scale }}
    >
      <m.span
        aria-hidden
        className={styles.stepStem}
        style={reduceMotion ? undefined : { scaleY: stemScale }}
      />
      <m.span
        aria-hidden
        className={styles.stepDot}
        style={reduceMotion ? undefined : { scale: dotScale, boxShadow: dotGlow }}
      />
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </m.article>
  );
}

export default function ProcessTimeline({
  phaseOne,
  phaseTwo,
}: ProcessTimelineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const timelineProgress = useTransform(scrollYProgress, [0, 0.92], [0, 1]);
  const smoothProgress = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.28,
  });

  const topRailScale = useTransform(smoothProgress, [0, 0.42], [0, 1]);
  const bottomRailScale = useTransform(smoothProgress, [0.38, 0.9], [0, 1]);
  const topPillOpacity = useTransform(smoothProgress, [0, 0.16], [0.4, 1]);
  const topPillY = useTransform(smoothProgress, [0, 0.16], [18, 0]);
  const bottomPillOpacity = useTransform(smoothProgress, [0.34, 0.52], [0.3, 1]);
  const bottomPillY = useTransform(smoothProgress, [0.34, 0.52], [18, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.12], [0.45, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.12], [24, 0]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyStage}>
        <div className={styles.scene}>
          <div className="container">
            <m.div
              className={styles.header}
              style={reduceMotion ? undefined : { opacity: headerOpacity, y: headerY }}
            >
              <h2>Development Process</h2>
              <p>
                From proposal and kickoff through QA, launch, and post-launch support,
                every stage follows one connected workflow so your Shopify project
                moves with clarity, consistency, and momentum.
              </p>
            </m.div>

            <div className={styles.track}>
              <m.div
                className={styles.pillWrap}
                style={reduceMotion ? undefined : { opacity: topPillOpacity, y: topPillY }}
              >
                <span className={styles.pill}>Design and Development</span>
              </m.div>

              <div className={styles.rail} aria-hidden="true">
                <m.span
                  className={styles.railProgress}
                  style={reduceMotion ? { scaleX: 1 } : { scaleX: topRailScale }}
                />
              </div>

              <div className={styles.stepsGridTop}>
                {phaseOne.map((step, index) => (
                  <TimelineStep
                    key={step.title}
                    step={step}
                    progress={smoothProgress}
                    range={[index * 0.1, index * 0.1 + 0.2]}
                  />
                ))}
              </div>

              <m.div
                className={styles.pillWrapBottom}
                style={
                  reduceMotion
                    ? undefined
                    : { opacity: bottomPillOpacity, y: bottomPillY }
                }
              >
                <span className={styles.pillAlt}>QA, Launch and Support</span>
              </m.div>

              <div className={styles.rail} aria-hidden="true">
                <m.span
                  className={styles.railProgress}
                  style={reduceMotion ? { scaleX: 1 } : { scaleX: bottomRailScale }}
                />
              </div>

              <div className={styles.stepsGridBottom}>
                {phaseTwo.map((step, index) => (
                  <TimelineStep
                    key={step.title}
                    step={step}
                    progress={smoothProgress}
                    range={[0.42 + index * 0.08, 0.42 + index * 0.08 + 0.18]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
