import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Process } from "@/components/home/Process";
import { company, serviceAreas } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — entreprise de rénovation à Paris",
  description:
    "Contactez AlexProReno : 07 82 47 53 39, alexproreno91@gmail.com. Entreprise de rénovation intervenant à Paris et en Île-de-France, du lundi au vendredi de 8h à 18h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — entreprise de rénovation à Paris",
    description:
      "Téléphone, email et zones d'intervention d'AlexProReno à Paris et en région parisienne.",
    url: "/contact",
  },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Par téléphone pour aller vite, par email ou via le formulaire de devis pour nous transmettre les détails et les photos."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <a className={styles.card} href={company.phoneHref} data-reveal>
              <span className="eyebrow">Téléphone</span>
              <span className={styles.cardValue}>{company.phone}</span>
              <span className={styles.cardNote}>
                Le plus direct. {company.hours}.
              </span>
            </a>

            <a className={styles.card} href={company.emailHref} data-reveal data-reveal-index={1}>
              <span className="eyebrow">Email</span>
              <span className={`${styles.cardValue} ${styles.cardValueSmall}`}>
                {company.email}
              </span>
              <span className={styles.cardNote}>
                Pour transmettre des documents ou des photos de l&apos;existant.
              </span>
            </a>

            <Link className={styles.card} href="/devis" data-reveal data-reveal-index={2}>
              <span className="eyebrow">Demande de devis</span>
              <span className={`${styles.cardValue} ${styles.cardValueSmall}`}>
                Formulaire détaillé
              </span>
              <span className={styles.cardNote}>
                Prestation, adresse du chantier, description et photos en une seule fois.
              </span>
            </Link>
          </div>

          <div className={styles.info}>
            <div data-reveal>
              <h2 className="display-m">Informations pratiques</h2>
            </div>
            <dl className={styles.infoList} data-reveal>
              <div className={styles.infoItem}>
                <dt className={styles.infoLabel}>Zone d&apos;intervention</dt>
                <dd className={styles.infoValue}>{company.area}</dd>
              </div>
              <div className={styles.infoItem}>
                <dt className={styles.infoLabel}>Horaires</dt>
                <dd className={styles.infoValue}>{company.hours}</dd>
              </div>
              <div className={styles.infoItem}>
                <dt className={styles.infoLabel}>Devis</dt>
                <dd className={styles.infoValue}>Gratuit et sans engagement</dd>
              </div>
              <div className={styles.infoItem}>
                <dt className={styles.infoLabel}>Instagram</dt>
                <dd className={styles.infoValue}>
                  <a href={company.instagram} target="_blank" rel="noreferrer noopener">
                    @alexpro9878
                  </a>
                </dd>
              </div>
              <div className={styles.infoItem}>
                <dt className={styles.infoLabel}>Siège</dt>
                <dd className={styles.infoValue}>
                  {company.address.street}, {company.address.postalCode} {company.address.city}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={`section ${styles.areas}`} aria-labelledby="zones-titre">
        <div className="container">
          <div className={styles.areasLayout}>
            <div data-reveal>
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                Zones d&apos;intervention
              </span>
              <h2 className="display-m" id="zones-titre">
                Où nous intervenons
              </h2>
              <p className={styles.areasIntro}>
                Nos chantiers se concentrent dans Paris intra-muros et en proche banlieue.
                Indiquez le code postal du chantier dans votre demande : nous confirmons
                rapidement si nous pouvons intervenir.
              </p>
            </div>

            <div data-reveal>
              <ul className={styles.districts}>
                {serviceAreas.districts.map((district) => (
                  <li className={styles.district} key={district.label}>
                    <span className={styles.districtLabel}>{district.label}</span>
                    <span className={styles.districtDetail}>{district.detail}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.areasNote}>
                Également en proche banlieue — {serviceAreas.towns.join(", ")} — et plus largement
                en {company.areaShort}. Nos réalisations publiées couvrent notamment les secteurs{" "}
                {serviceAreas.sectors.join(", ").toLowerCase()}.{" "}
                <Link className="link-underline" href="/realisations">
                  Voir les chantiers
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
