import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { relatedServices, serviceBySlug, services } from "@/content/services";
import { projectsBySlugs } from "@/content/projects";
import { processSteps } from "@/content/site";
import styles from "./service.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/prestations/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/prestations/${service.slug}`,
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = projectsBySlugs(service.projects);
  const otherServices = relatedServices(service);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Prestations", path: "/prestations" },
    { name: service.title, path: `/prestations/${service.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Prestation ${service.number}`}
        title={service.h1}
        intro={service.excerpt}
        crumbs={crumbs}
        actions={
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <Link className="btn btn--primary" href={`/devis?prestation=${service.slug}`}>
              Demander un devis
            </Link>
            <a className="btn btn--ghost" href="#realisations-liees">
              Voir des exemples
            </a>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className={styles.top}>
            <div data-reveal>
              <p className={styles.intro}>{service.intro}</p>

              <div className={styles.scope}>
                <h2 className={`display-s ${styles.scopeTitle}`}>Ce que nous réalisons</h2>
                <ul className={styles.scopeList}>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <figure className={styles.figure} data-reveal>
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                sizes="(max-width: 960px) 100vw, 48vw"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      <section className={`section ${styles.support}`} aria-labelledby="accompagnement-titre">
        <div className="container">
          <div className={styles.supportGrid}>
            <div data-reveal>
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                Notre accompagnement
              </span>
              <h2 className="display-m" id="accompagnement-titre">
                Comment se déroule votre projet
              </h2>
            </div>
            <div data-reveal>
              <p className={styles.supportText}>{service.support}</p>
              <ol className={styles.steps}>
                {processSteps.map((step) => (
                  <li className={styles.step} key={step.number}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pourquoi-titre">
        <div className="container">
          <SectionHead
            eyebrow="Pourquoi AlexProReno"
            title={`${service.title} : ce qui change`}
            id="pourquoi-titre"
            size="m"
          />
          <ul className={styles.reasons}>
            {service.reasons.map((reason, i) => (
              <li className={styles.reason} key={reason.title} data-reveal data-reveal-index={i}>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonText}>{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="section" id="realisations-liees" aria-labelledby="exemples-titre">
          <div className="container">
            <SectionHead
              eyebrow="Galerie"
              title="Des chantiers de cette nature"
              id="exemples-titre"
              size="m"
              aside={
                <Link className="link-underline" href="/realisations">
                  Toutes les réalisations
                </Link>
              }
            />
            <ProjectGrid projects={relatedProjects} />
          </div>
        </section>
      ) : null}

      <section className="section" id="questions" aria-labelledby="faq-titre">
        <div className="container">
          <SectionHead
            eyebrow="Questions fréquentes"
            title={`${service.title} : ce qu'on nous demande`}
            id="faq-titre"
            size="m"
          />
          <dl className={styles.faq}>
            {service.faq.map((entry, i) => (
              <div className={styles.faqItem} key={entry.question} data-reveal data-reveal-index={i}>
                <dt className={styles.faqQuestion}>{entry.question}</dt>
                <dd className={styles.faqAnswer}>{entry.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className={styles.quoteBand} data-reveal>
            <div>
              <p className={styles.quoteBandTitle}>
                Un projet de {service.title.toLowerCase()} ?
              </p>
              <p className={styles.quoteBandText}>
                Décrivez-nous votre projet : le formulaire est déjà positionné sur cette
                prestation. Devis gratuit et sans engagement.
              </p>
            </div>
            <Link className="btn btn--primary btn--lg" href={`/devis?prestation=${service.slug}`}>
              Demander un devis
            </Link>
          </div>

          <nav aria-label="Prestations associées" style={{ marginTop: 40 }}>
            <span className="mono-note" style={{ display: "block", marginBottom: 14 }}>
              Souvent réalisé avec
            </span>
            <ul className={styles.otherServices}>
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link className={styles.chip} href={`/prestations/${other.slug}`}>
                    {other.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={styles.chip} href="/prestations">
                  Toutes les prestations
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <ContactCta />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faq)} />
    </>
  );
}
