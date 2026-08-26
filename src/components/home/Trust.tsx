import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { brands, commitments } from "@/content/site";
import styles from "./Blocks.module.css";

export function Trust() {
  return (
    <section className={`section ${styles.trust}`} aria-labelledby="confiance-titre">
      <div className="container">
        <SectionHead
          eyebrow="Pourquoi nous confier votre chantier"
          title="Ce sur quoi nous nous engageons"
          id="confiance-titre"
          aside="Une équipe qui reste la même du premier rendez-vous à la réception, et un interlocuteur unique pour l'ensemble des corps d'état."
        />

        <ul className={styles.trustGrid}>
          {commitments.map((item, i) => (
            <li className={styles.trustCard} key={item.title} data-reveal data-reveal-index={i}>
              <h3 className={styles.trustTitle}>{item.title}</h3>
              <p className={styles.trustText}>{item.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.brands} data-reveal>
          <div>
            <h3 className="display-s">Des fournisseurs reconnus du bâtiment</h3>
            <p className={styles.brandsText} style={{ marginTop: 12 }}>
              Nous travaillons avec des marques établies du secteur, pour des matériaux fiables et
              disponibles dans la durée.
            </p>
          </div>
          <ul className={styles.brandsLogos}>
            {brands.map((brand) => (
              <li key={brand.name}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  sizes="120px"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
