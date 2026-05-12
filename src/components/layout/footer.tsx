import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <p className={styles.brand}>Muhammad Hasbiriza</p>
            <p className={styles.tagline}>
              Ecommerce engineering for polished, fast, conversion-focused storefronts.
            </p>
          </div>

          <nav className={styles.links}>
            <Link href="/#profile">Profile</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Muhammad Hasbiriza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
