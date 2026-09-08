import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import styles from "./ProjectGrid.module.css";

type Props = {
  projects: Project[];
  /** h2 quand la grille suit directement le h1 de la page, h3 sous un intertitre. */
  headingLevel?: "h2" | "h3";
};

export function ProjectGrid({ projects, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  return (
    <ul className={styles.grid}>
      {projects.map((project, i) => {
        const wide = project.size === "wide";
        return (
          <li
            key={project.slug}
            className={`${styles.item} ${wide ? styles.itemWide : ""} ${
              project.size === "tall" ? styles.itemTall : ""
            }`}
            data-reveal
            data-reveal-index={i % 3}
          >
            <Link className={styles.card} href={`/realisations/${project.slug}`}>
              <div className={`${styles.media} ${wide ? styles.mediaWide : ""}`}>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes={wide ? "(max-width: 620px) 100vw, 66vw" : "(max-width: 620px) 100vw, 33vw"}
                />
              </div>
              <div className={styles.overlay}>
                {project.location ? (
                  <span className={styles.location}>{project.location}</span>
                ) : null}
                <Heading className={styles.title}>{project.title}</Heading>
                <span className={styles.service}>{project.serviceLabel}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
