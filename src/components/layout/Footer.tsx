import Image from "next/image";
import Link from "next/link";
import { company, legalNav } from "@/content/site";
import { services } from "@/content/services";
import styles from "./Footer.module.css";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Prestations", href: "/prestations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
  { label: "Demander un devis", href: "/devis" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Image
              src="/media/logo.png"
              alt="AlexProReno"
              width={219}
              height={75}
              style={{ height: 34, width: "auto" }}
            />
            <p className={styles.baseline}>{company.baseline}</p>
            <a
              className={styles.social}
              href={company.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </div>

          <nav aria-labelledby="footer-nav">
            <span className={styles.colTitle} id="footer-nav">
              Navigation
            </span>
            <ul className={styles.list}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <span className={styles.colTitle} id="footer-services">
              Prestations
            </span>
            <ul className={styles.list}>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/prestations/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/prestations">Toutes les prestations</Link>
              </li>
            </ul>
          </nav>

          <div>
            <span className={styles.colTitle}>Contact</span>
            <ul className={styles.contactList}>
              <li>
                <strong>Téléphone</strong>
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a href={company.emailHref}>{company.email}</a>
              </li>
              <li>
                <strong>Zone d&apos;intervention</strong>
                {company.area}
              </li>
              <li>
                <strong>Horaires</strong>
                {company.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} AlexProReno</span>
          <nav aria-label="Informations légales">
            <ul className={styles.legalList}>
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
