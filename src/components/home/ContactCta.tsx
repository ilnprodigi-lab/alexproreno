import Link from "next/link";
import { company } from "@/content/site";
import styles from "./Blocks.module.css";

export function ContactCta() {
  return (
    <section className={`section ${styles.cta}`} id="contact" aria-labelledby="contact-titre">
      <div className="container">
        <div className={styles.ctaGrid}>
          <div data-reveal>
            <span className="eyebrow eyebrow--light" style={{ marginBottom: 18 }}>
              Contact
            </span>
            <h2 className={`display-l ${styles.ctaTitle}`} id="contact-titre">
              Parlons de votre projet.
            </h2>
            <p className={`lede ${styles.ctaText}`}>
              Un projet de rénovation ou d&apos;aménagement sur mesure ? Décrivez-nous ce que vous
              avez en tête : nous revenons vers vous pour organiser un relevé sur place et établir
              un devis détaillé, gratuit et sans engagement.
            </p>
            <div className={styles.ctaActions}>
              <Link className="btn btn--primary btn--lg" href="/devis">
                Demander un devis
              </Link>
              <a className="btn btn--onDark btn--lg" href={company.phoneHref}>
                Appeler le {company.phone}
              </a>
            </div>
          </div>

          <ul className={styles.ctaList} data-reveal>
            <li className={styles.ctaItem}>
              <span className={styles.ctaLabel}>Téléphone</span>
              <a className={styles.ctaValue} href={company.phoneHref}>
                {company.phone}
              </a>
            </li>
            <li className={styles.ctaItem}>
              <span className={styles.ctaLabel}>Email</span>
              <a
                className={`${styles.ctaValue} ${styles.ctaValueSmall}`}
                href={company.emailHref}
              >
                {company.email}
              </a>
            </li>
            <li className={styles.ctaItem}>
              <span className={styles.ctaLabel}>Horaires</span>
              <span className={`${styles.ctaValue} ${styles.ctaValueSmall}`}>{company.hours}</span>
            </li>
            <li className={styles.ctaItem}>
              <span className={styles.ctaLabel}>Zone</span>
              <span className={`${styles.ctaValue} ${styles.ctaValueSmall}`}>{company.area}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
