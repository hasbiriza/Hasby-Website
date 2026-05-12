import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore projects built by Hasbi — web apps, tools, and more.",
};

export default function ProjectsPage() {
  return (
    <section className={`section ${styles.projects}`}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">
            A collection of things I&apos;ve built and worked on.
          </p>
        </div>
        <div className={styles.grid}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardDescription}>
                  {project.description}
                </p>
                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
