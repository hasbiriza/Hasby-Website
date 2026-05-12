import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogArticles } from "@/data/blog-articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and insights by Hasbi.",
};

export default function BlogPage() {
  return (
    <section className={`section ${styles.blog}`}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">
            Insight dan breakdown teknis seputar Shopify engineering.
          </p>
        </div>

        <div className={styles.grid}>
          {blogArticles.map((article) => (
            <article key={article.slug} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1920}
                  height={1080}
                  className={styles.image}
                />
                <span className={styles.category}>#{article.category}</span>
              </div>

              <div className={styles.content}>
                <h2 className={styles.cardTitle}>{article.title}</h2>
                <p className={styles.cardDescription}>{article.description}</p>

                <div className={styles.footerRow}>
                  <Link href={`/blog/${article.slug}`} className={styles.readMore}>
                    Read more
                    <ArrowRight className={styles.readMoreIcon} />
                  </Link>
                  <span className={styles.date}>{article.publishDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
