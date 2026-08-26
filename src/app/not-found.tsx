import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="eyebrow" style={{ marginBottom: 18 }}>
          Erreur 404
        </span>
        <h1 className="display-l">Cette page n&apos;existe pas.</h1>
        <p className="lede" style={{ marginTop: 20, maxWidth: "52ch", color: "var(--stone)" }}>
          Le lien est peut-être incorrect ou la page a été déplacée. Voici par où reprendre.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <Link className="btn btn--primary" href="/">
            Retour à l&apos;accueil
          </Link>
          <Link className="btn btn--ghost" href="/prestations">
            Voir les prestations
          </Link>
          <Link className="btn btn--ghost" href="/devis">
            Demander un devis
          </Link>
        </div>

        <nav aria-label="Prestations" style={{ marginTop: 48 }}>
          <span className="mono-note" style={{ display: "block", marginBottom: 14 }}>
            Prestations les plus consultées
          </span>
          <ul style={{ display: "grid", gap: 10, listStyle: "none" }}>
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link className="link-underline" href={`/prestations/${service.slug}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
