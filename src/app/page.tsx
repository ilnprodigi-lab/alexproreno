import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Craft } from "@/components/home/Craft";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { Process } from "@/components/home/Process";
import { Trust } from "@/components/home/Trust";
import { ContactCta } from "@/components/home/ContactCta";
import { SectionHead } from "@/components/ui/SectionHead";
import { services } from "@/content/services";
import { featuredProjects, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "AlexProReno — Entreprise de rénovation à Paris",
  description:
    "Entreprise de rénovation à Paris et en Île-de-France : appartement, maison, cuisine et dressing sur mesure, plomberie, électricité, peinture, fenêtres, IPN.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AlexProReno — Entreprise de rénovation à Paris et en Île-de-France",
    description:
      "Rénovation intérieure tous corps d'état à Paris et en région parisienne. Une seule équipe, du relevé aux finitions. Devis gratuit et sans engagement.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Craft />

      <section className="section" id="prestations" aria-labelledby="prestations-titre">
        <div className="container">
          <SectionHead
            eyebrow="Nos prestations"
            title="Nos prestations de rénovation à Paris"
            id="prestations-titre"
            aside={
              <>
                Rénovation d&apos;appartement ou de maison, aménagements sur mesure et travaux tous
                corps d&apos;état. Chaque prestation est détaillée sur sa propre page.{" "}
                <Link className="link-underline" href="/prestations">
                  Voir les {services.length} prestations
                </Link>
              </>
            }
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className="section" id="realisations" aria-labelledby="realisations-titre">
        <div className="container">
          <SectionHead
            eyebrow="Réalisations"
            title="Nos derniers chantiers"
            id="realisations-titre"
            aside={
              <Link className="link-underline" href="/realisations">
                Voir les {projects.length} réalisations
              </Link>
            }
          />
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      <Process />
      <Trust />
      <ContactCta />
    </>
  );
}
