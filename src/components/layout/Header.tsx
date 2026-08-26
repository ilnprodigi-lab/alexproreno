"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, mainNav } from "@/content/site";
import { useScrolled } from "@/lib/client-hooks";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const scrolled = useScrolled();

  // Referme le menu à chaque navigation, sans passer par un effet.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <span className={styles.topbarClaim}>
            Devis gratuit et sans engagement — {company.area}
          </span>
          <div className={styles.topbarLinks}>
            <a href={company.instagram} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a className={styles.topbarPhone} href={company.phoneHref}>
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={`container ${styles.bar}`}>
          <Link className={styles.brand} href="/" aria-label="AlexProReno — accueil">
            <Image
              src="/media/logo.png"
              alt="AlexProReno"
              width={219}
              height={75}
              priority
              style={{ height: 34, width: "auto" }}
            />
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a className={styles.phoneLink} href={company.phoneHref}>
              {company.phone}
            </a>
            <Link className="btn btn--primary" href="/devis">
              Demander un devis
            </Link>
            <button
              type="button"
              className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className={styles.burgerBars} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        // `inert` neutralise le panneau fermé sans casser la transition
        // d'opacité, contrairement à `hidden` qui bascule display.
        inert={!open}
      >
        <div className={`container ${styles.panelHead}`}>
          <Link className={styles.brand} href="/" aria-label="AlexProReno — accueil">
            <Image
              src="/media/logo.png"
              alt="AlexProReno"
              width={219}
              height={75}
              style={{ height: 28, width: "auto" }}
            />
          </Link>
          <button
            type="button"
            className={`${styles.burger} ${styles.burgerOpen}`}
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <span className={styles.burgerBars} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <div className={`container ${styles.panelBody}`}>
          <ul className={styles.panelNav}>
            <li>
              <Link href="/">
                Accueil <span>01</span>
              </Link>
            </li>
            {mainNav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label} <span>{String(i + 2).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.panelFooter}>
            <div className={styles.panelContact}>
              <span className="mono-note">Nous joindre</span>
              <a href={company.phoneHref}>{company.phone}</a>
              <a href={company.emailHref}>{company.email}</a>
            </div>
            <Link className="btn btn--primary btn--lg btn--block" href="/devis">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
