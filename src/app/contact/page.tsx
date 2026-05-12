import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Hasbi — let's collaborate on something great.",
};

export default function ContactPage() {
  return (
    <section className={`section ${styles.contact}`}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Contact</h1>
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? Feel free to reach
            out.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Email</h3>
              <a href="mailto:hello@hasbi.dev" className={styles.infoValue}>
                hello@hasbi.dev
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Location</h3>
              <p className={styles.infoValue}>Indonesia</p>
            </div>
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Availability</h3>
              <p className={styles.infoValue}>Open for freelance & collaboration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
