import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Hasbi — background, skills, and experience.",
};

export default function AboutPage() {
  return (
    <section className={`section ${styles.about}`}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            A bit about who I am and what I do.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              Hi! I&apos;m Hasbi, a passionate developer who loves building
              things for the web. I focus on creating clean, performant, and
              accessible digital experiences.
            </p>
            <p>
              I enjoy working with modern technologies like TypeScript, React,
              Next.js, and Node.js. When I&apos;m not coding, you can find me
              exploring new technologies or contributing to open source.
            </p>
          </div>
          <div className={styles.skills}>
            <h2 className={styles.skillsTitle}>Skills & Technologies</h2>
            <div className={styles.skillGrid}>
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Prisma",
                "CSS",
                "Git",
                "REST API",
              ].map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
