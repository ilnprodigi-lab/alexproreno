import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { projectBySlug, projects } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import styles from "./project.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  const title = project.location ? `${project.title} — ${project.location}` : project.title;
  const description = project.location
    ? `${project.summary} Réalisé à ${project.location} par AlexProReno.`
    : `${project.summary} Réalisé par AlexProReno.`;
  return {
    title,
    description,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/realisations/${project.slug}`,
      images: [{ url: project.image.src, alt: project.image.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const service = serviceBySlug(project.service);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Réalisations", path: "/realisations" },
    { name: project.title, path: `/realisations/${project.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={project.location ?? project.serviceLabel}
        title={project.title}
        intro={project.summary}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div>
              <figure className={styles.figure} data-reveal>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(max-width: 960px) 100vw, 62vw"
                  priority
                />
              </figure>

              <div className={styles.body}>
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={styles.aside}>
              <ul className={styles.meta}>
                {project.location ? (
                  <li className={styles.metaItem}>
                    <span className={styles.metaLabel}>Localisation</span>
                    <span className={styles.metaValue}>{project.location}</span>
                  </li>
                ) : null}
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Prestation</span>
                  <span className={styles.metaValue}>
                    {service ? (
                      <Link href={`/prestations/${service.slug}`}>{project.serviceLabel}</Link>
                    ) : (
                      project.serviceLabel
                    )}
                  </span>
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Intervenant</span>
                  <span className={styles.metaValue}>AlexProReno</span>
                </li>
              </ul>

              <Link
                className="btn btn--primary btn--block"
                href={`/devis?prestation=${project.service}`}
              >
                Un projet similaire ?
              </Link>
            </div>
          </div>

          <div className={styles.nav}>
            <Link className="link-underline" href="/realisations">
              ← Toutes les réalisations
            </Link>
            {service ? (
              <Link className="link-underline" href={`/prestations/${service.slug}`}>
                La prestation « {service.title} » →
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="autres-titre">
        <div className="container">
          <SectionHead
            eyebrow="Poursuivre"
            title="D'autres chantiers"
            id="autres-titre"
            size="m"
          />
          <ProjectGrid projects={others} />
        </div>
      </section>

      <ContactCta />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
