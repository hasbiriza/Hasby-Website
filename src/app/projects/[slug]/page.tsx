import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className={`section ${styles.detail}`}>
      <div className="container">
        <Link href="/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
        {project.content && (
          <div className={styles.content}>
            <p>{project.content}</p>
          </div>
        )}
        <div className={styles.links}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              Live Demo →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtnSecondary}
            >
              Source Code →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
