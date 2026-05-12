import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/data/blog-articles";
import styles from "./blogs.module.css";

export default function Blogs() {
  const featured = blogArticles.slice(0, 3);

  return (
    <section className={`section ${styles.blogsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.kicker}>
            Insights
          </p>
          <h2 className={styles.title}>
            Blog Articles
          </h2>
          <p className={styles.subtitle}>
            Artikel pilihan tentang Shopify development, conversion, dan growth engineering.
          </p>
        </div>

        <div className={styles.grid}>
          {featured.map((article) => (
            <article
              className={styles.card}
              key={article.slug}
            >
              <div className={styles.imageWrap}>
                <Image
                  alt={article.title}
                  className={styles.image}
                  height={1080}
                  src={article.image || "/placeholder.svg"}
                  width={1920}
                />
                <div className={styles.imageOverlay} />
                <p className={styles.category}>
                  #{article.category}
                </p>
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>
                  {article.title}
                </h3>
                <p className={styles.cardDescription}>
                  {article.description}
                </p>

                <div className={styles.footer}>
                  <Link
                    className={styles.readMore}
                    href={`/blog/${article.slug}`}
                  >
                    <span className={styles.iconWrap}>
                      <ArrowRight className={styles.iconPrimary} />
                      <ArrowRight className={styles.iconSecondary} />
                    </span>
                    Read more
                  </Link>

                  <span className={styles.date}>
                    {article.publishDate}
                    <span className={styles.dateLine} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAllWrap}>
          <Link href="/blog" className={styles.viewAll}>
            View all blogs
            <ArrowRight className={styles.viewAllIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
}
