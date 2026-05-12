"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import MagneticLink from "@/components/ui/magnetic-link";
import styles from "./header.module.css";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Profile", href: "/#profile" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/#home" className={styles.brand}>
          <span className={styles.brandName}>Muhammad Hasbiriza</span>
          <span className={styles.brandRole}>Commerce Engineer</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MagneticLink href="/#contact" className={styles.cta} strength={14}>
          Let&apos;s Work
        </MagneticLink>
        <button
          type="button"
          className={styles.mobileToggle}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => {
            setIsMobileMenuOpen((value) => !value);
          }}
        >
          Menu
        </button>
      </div>
      <div
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOverlayOpen : ""
        }`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      />
      <aside
        id={mobileMenuId}
        className={`${styles.mobileDrawer} ${
          isMobileMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileDrawerHeader}>
          <div>
            <p className={styles.mobileEyebrow}>Navigation</p>
            <p className={styles.mobileTitle}>Muhammad Hasbiriza</p>
          </div>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            Close
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/#contact"
          className={styles.mobileContact}
          onClick={closeMobileMenu}
        >
          Start a project
        </Link>
      </aside>
    </header>
  );
}
