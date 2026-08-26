import styles from "./SectionHead.module.css";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  /** Contenu affiché à droite du titre : texte d'accompagnement ou lien. */
  aside?: React.ReactNode;
  /** Niveau de titre, pour garder une hiérarchie correcte par page. */
  as?: "h2" | "h3";
  id?: string;
  size?: "l" | "m";
};

export function SectionHead({ eyebrow, title, aside, as = "h2", id, size = "l" }: Props) {
  const Heading = as;
  return (
    <div className={styles.head} data-reveal>
      <div className={styles.main}>
        {eyebrow ? <span className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</span> : null}
        <Heading className={size === "l" ? "display-l" : "display-m"} id={id}>
          {title}
        </Heading>
      </div>
      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </div>
  );
}
