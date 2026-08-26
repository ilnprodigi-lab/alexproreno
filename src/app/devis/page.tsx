import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { company, processSteps } from "@/content/site";
import { services } from "@/content/services";
import styles from "./devis.module.css";

export const metadata: Metadata = {
  title: "Devis rénovation gratuit à Paris",
  description:
    "Décrivez votre projet de rénovation à Paris ou en Île-de-France. AlexProReno organise un relevé sur place et établit un devis détaillé, sans engagement.",
  alternates: { canonical: "/devis" },
  openGraph: {
    title: "Devis rénovation gratuit à Paris et en Île-de-France",
    description:
      "Demandez un devis de rénovation à AlexProReno : relevé sur place, chiffrage détaillé, sans engagement.",
    url: "/devis",
  },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Demander un devis", path: "/devis" },
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ prestation?: string }>;
}) {
  const { prestation } = await searchParams;
  const presetService = services.some((s) => s.slug === prestation) ? prestation! : "";

  return (
    <>
      <PageHeader
        eyebrow="Devis gratuit et sans engagement"
        title="Demander un devis"
        intro="Plus votre description est précise, plus notre retour le sera. Tous les champs marqués facultatifs peuvent être laissés vides."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <aside className={styles.aside}>
              <div>
                <h2 className="display-s">Ce qui se passe ensuite</h2>
                <p className={styles.asideText} style={{ marginTop: 12 }}>
                  Votre demande arrive directement chez nous. Nous la lisons et revenons vers vous
                  pour organiser la suite.
                </p>
              </div>

              <ol className={styles.steps}>
                {processSteps.slice(0, 3).map((step) => (
                  <li className={styles.step} key={step.number}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={styles.direct}>
                <p className={styles.directTitle}>Vous préférez nous parler ?</p>
                <div className={styles.directLinks}>
                  <a href={company.phoneHref}>{company.phone}</a>
                  <a href={company.emailHref}>{company.email}</a>
                </div>
                <p className="mono-note" style={{ marginTop: 6 }}>
                  {company.hoursShort}
                </p>
              </div>
            </aside>

            <div>
              <QuoteForm presetService={presetService} />
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
