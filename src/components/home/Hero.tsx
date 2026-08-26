import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/ui/Parallax";
import { company } from "@/content/site";
import styles from "./Hero.module.css";

const facts = [
  { label: "Zone d'intervention", value: company.area },
  { label: "Horaires", value: company.hoursShort },
  { label: "Devis", value: "Gratuit et sans engagement" },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titre">
      {/* Rideau d'entrée, purement décoratif : jamais annoncé, jamais interactif. */}
      <div className={styles.intro} aria-hidden="true">
        <div className={styles.introMark}>
          <Image
            className={styles.introLogo}
            src="/media/logo.png"
            alt=""
            width={219}
            height={75}
          />
          <span className={styles.introRule} />
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.eyebrowRow}>
            <span className="eyebrow">
              Entreprise de rénovation — Paris &amp; Île-de-France
            </span>
          </div>

          <h1 className={`display-xl ${styles.title}`} id="hero-titre">
            <span className={styles.titleLine}>
              <span style={{ ["--d" as string]: "80ms" }}>Votre projet.</span>
            </span>
            <span className={styles.titleLine}>
              <span style={{ ["--d" as string]: "200ms" }}>
                Notre <em className={styles.titleAccent}>savoir-faire</em>.
              </span>
            </span>
          </h1>

          <p className={`lede ${styles.lede}`}>
            AlexProReno rénove appartements et maisons à Paris et en région parisienne :
            rénovation intérieure tous corps d&apos;état, aménagements sur mesure et travaux de
            second œuvre. Des premières mesures à la dernière finition, une seule équipe vous
            accompagne.
          </p>

          <div className={styles.ctas}>
            <Link className="btn btn--primary btn--lg" href="/devis">
              Demander un devis
            </Link>
            <Link className="btn btn--ghost btn--lg" href="/realisations">
              Découvrir nos réalisations
            </Link>
          </div>

          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt className="mono-note">{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className={styles.visual}>
          <div className={styles.frame}>
            <Parallax amount={48} className={styles.frameInner}>
              <Image
                src="/media/cuisine-paris07.webp"
                alt="Cuisine contemporaine sur mesure réalisée par AlexProReno dans un appartement du 7e arrondissement de Paris"
                width={1600}
                height={1066}
                priority
                sizes="(max-width: 980px) 100vw, 46vw"
              />
            </Parallax>
          </div>
          <figcaption className={styles.caption}>
            <span className="mono-note">Paris 07</span>
            <span className={styles.captionTitle}>Cuisine contemporaine sur mesure</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
