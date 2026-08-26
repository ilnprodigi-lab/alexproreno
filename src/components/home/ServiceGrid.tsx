import Link from "next/link";
import type { Service } from "@/content/services";
import styles from "./ServiceGrid.module.css";

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M11 3H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

type Props = {
  services: Service[];
  /** h2 quand la grille suit directement le h1 de la page, h3 sous un intertitre. */
  headingLevel?: "h2" | "h3";
};

export function ServiceGrid({ services, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  return (
    <ul className={styles.grid}>
      {services.map((service, i) => (
        <li key={service.slug} data-reveal data-reveal-index={i % 3}>
          <Link className={styles.card} href={`/prestations/${service.slug}`}>
            <div className={styles.cardTop}>
              <span className={styles.number}>{service.number}</span>
              <Arrow />
            </div>
            <Heading className={styles.cardTitle}>{service.title}</Heading>
            <p className={styles.cardText}>{service.excerpt}</p>
            <span className={styles.cardFlag}>Voir la prestation</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
