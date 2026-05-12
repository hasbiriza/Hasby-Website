"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./project-work-grid.module.css";
import type { ShopifyProject } from "@/types";

type ProjectWorkGridProps = {
  categories: readonly string[];
  projects: ShopifyProject[];
};

export default function ProjectWorkGrid({
  categories,
  projects,
}: ProjectWorkGridProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "All Works");

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All Works") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className={styles.workInner}>
      <div className={styles.workHeader}>
        <h2 className={styles.workTitle}>
          <span>Shopify</span> Projects
        </h2>
        <div className={styles.workCategories} aria-label="Project categories">
          {categories.map((category) => (
            <button
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategory : ""
              }`}
              type="button"
              aria-pressed={activeCategory === category}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.categorySelectWrap}>
          <select
            className={styles.categorySelect}
            aria-label="Project category"
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.projectGrid}>
        {visibleProjects.map((project) => (
          <a
            className={styles.projectCard}
            href={project.href}
            key={project.title}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.projectLogoPanel}>
              {project.imageSrc ? (
                <Image
                  className={styles.projectImage}
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              ) : project.logoSrc ? (
                <Image
                  className={styles.projectLogo}
                  src={project.logoSrc}
                  alt={`${project.title} logo`}
                  width={260}
                  height={120}
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              ) : (
                <span className={styles.projectWordmark}>{project.wordmark}</span>
              )}
            </span>
            <span className={styles.projectName}>{project.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
