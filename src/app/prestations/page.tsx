import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { Process } from "@/components/home/Process";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, serviceListJsonLd } from "@/lib/seo";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Prestations de rénovation à Paris",
  description:
    "Rénovation intérieure, pose d'IPN, cuisine et dressing sur mesure, plomberie, électricité, peinture, carrelage, fenêtres : les prestations d'AlexProReno.",
  alternates: { canonical: "/prestations" },
  openGraph: {
    title: "Prestations de rénovation à Paris et en Île-de-France",
    description:
      "Toutes les prestations d'AlexProReno, entreprise de rénovation tous corps d'état à Paris et en région parisienne.",
    url: "/prestations",
  },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Prestations", path: "/prestations" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${services.length} prestations`}
        title="Nos prestations de rénovation à Paris et en Île-de-France"
        intro="De la pièce isolée à la rénovation complète d'un appartement : nous réunissons dans une même équipe les métiers nécessaires à votre projet. Chaque prestation dispose de sa page détaillée."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <ServiceGrid services={services} headingLevel="h2" />
        </div>
      </section>

      <Process />
      <ContactCta />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceListJsonLd()} />
    </>
  );
}
