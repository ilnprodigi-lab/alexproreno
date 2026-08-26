import { SectionHead } from "@/components/ui/SectionHead";
import { pillars } from "@/content/site";
import styles from "./Blocks.module.css";

export function Craft() {
  return (
    <section className="section" id="savoir-faire" aria-labelledby="savoir-faire-titre">
      <div className="container">
        <div className={styles.craft}>
          <div data-reveal>
            <SectionHead
              eyebrow="Savoir-faire"
              title="Un travail de précision"
              id="savoir-faire-titre"
            />
            <p className={`lede ${styles.craftText}`}>
              Chaque projet mérite une attention millimétrée : des plans à l&apos;exécution, des
              matériaux aux finitions. Notre savoir-faire repose sur la maîtrise des gestes
              techniques et le respect des moindres tolérances.
            </p>
            <ul className={styles.craftMeta}>
              <li>Une salle de bain à rénover, un espace à repenser, un bâti ancien à reprendre</li>
              <li>Tous corps d&apos;état réunis dans une seule équipe</li>
              <li>Paris et région parisienne</li>
            </ul>
          </div>

          <ul className={styles.pillars}>
            {pillars.map((pillar, i) => (
              <li className={styles.pillar} key={pillar.title} data-reveal data-reveal-index={i}>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
