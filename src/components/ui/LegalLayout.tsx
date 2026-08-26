import styles from "./LegalLayout.module.css";

export type LegalSection = { id: string; title: string };

type Props = {
  sections: LegalSection[];
  updated?: string;
  children: React.ReactNode;
};

export function LegalLayout({ sections, updated, children }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="Sommaire">
            <span className={styles.tocTitle}>Sommaire</span>
            <ol className={styles.tocList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={`prose ${styles.content}`}>
            {updated ? (
              <p className={`mono-note ${styles.updated}`}>Dernière mise à jour : {updated}</p>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
