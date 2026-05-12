import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles } from "@/data/blog-articles";
import styles from "./page.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <section className={`section ${styles.post}`}>
      <div className="container">
        <Link href="/blog" className={styles.backLink}>
          ← Back to all blogs
        </Link>

        <header className={styles.header}>
          <span className={styles.category}>#{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
          <p className={styles.date}>{article.publishDate}</p>
        </header>

        <div className={styles.imageWrap}>
          <Image
            src={article.image}
            alt={article.title}
            width={1920}
            height={1080}
            className={styles.image}
          />
        </div>

        <article className={styles.content}>
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </div>
    </section>
  );
}
