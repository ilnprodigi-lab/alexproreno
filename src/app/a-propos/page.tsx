import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHead } from "@/components/ui/SectionHead";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { commitments, company, founderQuote, pillars } from "@/content/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À propos — entreprise de rénovation à Paris",
  description:
    "AlexProReno, entreprise de rénovation tous corps d'état à Paris et en Île-de-France : une équipe de spécialistes, un travail de précision et un suivi personnalisé.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — entreprise de rénovation à Paris",
    description:
      "Qui est derrière AlexProReno : une équipe de spécialistes de la rénovation intérieure en région parisienne.",
    url: "/a-propos",
  },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre histoire"
        title="Une équipe de spécialistes"
        intro="AlexProReno réunit dans une même équipe les métiers nécessaires à une rénovation intérieure, pour éviter au client d'avoir à coordonner plusieurs entreprises."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div data-reveal>
              <blockquote className={styles.quote}>« {founderQuote} »</blockquote>
              <div className={styles.author}>
                <Image
                  src="/media/portrait.png"
                  alt={`${company.founderFirstName}, gérant d'AlexProReno`}
                  width={150}
                  height={150}
                />
                <div>
                  <p className={styles.authorName}>{company.founderFirstName}</p>
                  <p className="mono-note">{company.founderRole}</p>
                </div>
              </div>
            </div>

            <figure className={styles.portrait} data-reveal>
              <Image
                src="/media/dressing-paris02.webp"
                alt="Dressing pleine hauteur en bois réalisé sur mesure par l'équipe AlexProReno"
                width={1500}
                height={2000}
                sizes="(max-width: 960px) 100vw, 46vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="valeurs-titre">
        <div className="container">
          <SectionHead
            eyebrow="Ce qui nous tient"
            title="Quatre engagements, sur chaque chantier"
            id="valeurs-titre"
            size="m"
          />
          <ul className={styles.values}>
            {commitments.map((item, i) => (
              <li className={styles.value} key={item.title} data-reveal data-reveal-index={i % 2}>
                <h3 className={styles.valueTitle}>{item.title}</h3>
                <p className={styles.valueText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="methode-travail-titre">
        <div className="container">
          <SectionHead
            eyebrow="Notre manière de travailler"
            title="Le travail de précision, concrètement"
            id="methode-travail-titre"
            size="m"
          />
          <ul className={styles.values}>
            {pillars.map((pillar, i) => (
              <li className={styles.value} key={pillar.title} data-reveal data-reveal-index={i % 2}>
                <h3 className={styles.valueTitle}>{pillar.title}</h3>
                <p className={styles.valueText}>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.identity}`} aria-labelledby="identite-titre">
        <div className="container">
          <div className={styles.identityGrid}>
            <div data-reveal>
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                L&apos;entreprise
              </span>
              <h2 className="display-m" id="identite-titre">
                Qui est derrière AlexProReno
              </h2>
            </div>
            <dl className={styles.identityList} data-reveal>
              <div className={styles.identityItem}>
                <dt className={styles.identityLabel}>Dénomination</dt>
                <dd className={styles.identityValue}>{company.legalName}</dd>
              </div>
              <div className={styles.identityItem}>
                <dt className={styles.identityLabel}>Forme</dt>
                <dd className={styles.identityValue}>{company.legalForm}</dd>
              </div>
              <div className={styles.identityItem}>
                <dt className={styles.identityLabel}>Activité</dt>
                <dd className={styles.identityValue}>{company.ape}</dd>
              </div>
              <div className={styles.identityItem}>
                <dt className={styles.identityLabel}>SIREN</dt>
                <dd className={styles.identityValue}>{company.siren}</dd>
              </div>
              <div className={styles.identityItem}>
                <dt className={styles.identityLabel}>Zone d&apos;intervention</dt>
                <dd className={styles.identityValue}>{company.area}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <ContactCta />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
