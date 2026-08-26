import Link from "next/link";
import { company } from "@/content/site";
import styles from "./MobileActionBar.module.css";

/** Appel et devis toujours à portée de pouce sur mobile. */
export function MobileActionBar() {
  return (
    <div className={styles.bar} aria-label="Actions rapides">
      <a className="btn btn--ghost" href={company.phoneHref}>
        Appeler
      </a>
      <Link className="btn btn--primary" href="/devis">
        Demander un devis
      </Link>
    </div>
  );
}
