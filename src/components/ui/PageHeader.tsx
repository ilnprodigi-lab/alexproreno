import Link from "next/link";
import styles from "./PageHeader.module.css";

export type Crumb = { name: string; path: string };

type Props = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  actions?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, intro, crumbs, actions }: Props) {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav aria-label="Fil d'Ariane">
          <ol className={styles.breadcrumb}>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path}>
                  {last ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={styles.grid}>
          <div>
            {eyebrow ? <span className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</span> : null}
            <h1 className={`display-l ${styles.title}`}>{title}</h1>
          </div>
          <div>
            {intro ? <p className={`lede ${styles.intro}`}>{intro}</p> : null}
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
}
