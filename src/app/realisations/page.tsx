import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Réalisations — chantiers de rénovation à Paris",
  description:
    "Cuisines et dressings sur mesure, aménagements sous escalier, mobilier, rénovation complète : les chantiers réalisés par AlexProReno à Paris et en région parisienne.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations — chantiers de rénovation à Paris",
    description:
      "Les chantiers de rénovation et d'aménagement sur mesure réalisés par AlexProReno à Paris, Villejuif, Antony et Juvisy-sur-Orge.",
    url: "/realisations",
  },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${projects.length} réalisations`}
        title="Nos chantiers de rénovation à Paris et en Île-de-France"
        intro="Des projets réalisés à Paris et en proche banlieue. Chaque fiche précise la prestation concernée et la nature du travail effectué."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <ProjectGrid projects={projects} headingLevel="h2" />
        </div>
      </section>

      <ContactCta />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
