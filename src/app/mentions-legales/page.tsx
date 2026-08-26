import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { company, host, mediator } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site AlexProReno : éditeur, directeur de la publication, hébergeur, propriété intellectuelle, responsabilité et médiation de la consommation.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Mentions légales", path: "/mentions-legales" },
];

const sections = [
  { id: "editeur", title: "Éditeur du site" },
  { id: "publication", title: "Directeur de la publication" },
  { id: "hebergeur", title: "Hébergeur" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "liens", title: "Liens externes" },
  { id: "donnees", title: "Données personnelles et cookies" },
  { id: "droit", title: "Droit applicable" },
  { id: "mediation", title: "Médiation de la consommation" },
  { id: "contact", title: "Contact" },
];

export default function LegalNoticePage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        intro="Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, sont précisées ci-dessous l'identité des intervenants du site et les conditions de son utilisation."
        crumbs={crumbs}
      />

      <LegalLayout sections={sections}>
        <h2 id="editeur">Éditeur du site</h2>
        <p>Le site est édité par :</p>
        <dl>
          <dt>Dénomination</dt>
          <dd>{company.legalName}</dd>
          <dt>Forme juridique</dt>
          <dd>
            {company.legalForm} — {company.owner}
          </dd>
          <dt>Adresse du siège</dt>
          <dd>
            {company.address.street}, {company.address.postalCode} {company.address.city},{" "}
            {company.address.country}
          </dd>
          <dt>SIREN</dt>
          <dd>{company.siren}</dd>
          <dt>SIRET</dt>
          <dd>{company.siret}</dd>
          <dt>TVA intracommunautaire</dt>
          <dd>{company.vat}</dd>
          <dt>Code APE</dt>
          <dd>{company.ape}</dd>
          <dt>Registre National des Entreprises (RNE)</dt>
          <dd>Inscrit depuis le {company.rneRegistration}</dd>
          <dt>Téléphone</dt>
          <dd>
            <a href={company.phoneHref}>{company.phoneInternational}</a>
          </dd>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a>
          </dd>
        </dl>

        <h2 id="publication">Directeur de la publication</h2>
        <p>{company.owner}</p>

        <h2 id="hebergeur">Hébergeur</h2>
        <p>Le site est hébergé par :</p>
        <dl>
          <dt>Société</dt>
          <dd>{host.name}</dd>
          <dt>Adresse</dt>
          <dd>{host.address}</dd>
          <dt>Site internet</dt>
          <dd>
            <a href={host.url} target="_blank" rel="noreferrer noopener">
              {host.url}
            </a>
          </dd>
        </dl>

        <h2 id="propriete">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur le site — notamment les textes, images,
          photographies, logos, graphismes, vidéos et éléments de conception — est protégé par les
          dispositions du Code de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, diffusion, adaptation ou exploitation, totale ou
          partielle, du contenu du site sans autorisation écrite préalable est interdite.
        </p>

        <h2 id="responsabilite">Responsabilité</h2>
        <p>
          {company.legalName} met tout en œuvre afin de fournir des informations fiables et
          régulièrement mises à jour. L&apos;entreprise ne saurait toutefois être tenue responsable
          des erreurs, omissions ou d&apos;une indisponibilité temporaire du site.
        </p>
        <p>
          L&apos;utilisateur reconnaît utiliser les informations du site sous sa seule
          responsabilité.
        </p>

        <h2 id="liens">Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. {company.legalName} ne peut être
          tenu responsable du contenu ou des pratiques de ces sites externes.
        </p>

        <h2 id="donnees">Données personnelles et cookies</h2>
        <p>
          Les données personnelles éventuellement collectées sur le site sont traitées conformément
          au Règlement Général sur la Protection des Données (RGPD). Pour plus d&apos;informations
          sur la collecte et le traitement des données, consultez la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
        <p>
          Le site peut utiliser des cookies nécessaires à son bon fonctionnement ainsi que des
          cookies de mesure d&apos;audience. L&apos;utilisateur peut configurer son navigateur afin
          d&apos;accepter ou de refuser tout ou partie des cookies.
        </p>

        <h2 id="droit">Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. Tout litige relatif à
          l&apos;utilisation du site relève de la compétence des juridictions françaises.
        </p>

        <h2 id="mediation">Médiation de la consommation</h2>
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la consommation, tout
          consommateur a le droit de recourir gratuitement à un dispositif de médiation de la
          consommation en vue de la résolution amiable d&apos;un litige.
        </p>
        <p>
          Après démarche préalable écrite auprès de {company.legalName}, le consommateur pourra
          saisir :
        </p>
        <dl>
          <dt>Médiateur</dt>
          <dd>{mediator.name}</dd>
          <dt>Adresse</dt>
          <dd>{mediator.address}</dd>
          <dt>Site internet</dt>
          <dd>
            <a href={mediator.url} target="_blank" rel="noreferrer noopener">
              {mediator.url}
            </a>
          </dd>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${mediator.email}`}>{mediator.email}</a>
          </dd>
        </dl>

        <h2 id="contact">Contact</h2>
        <p>Pour toute question concernant le site ou son contenu :</p>
        <dl>
          <dt>Adresse</dt>
          <dd>
            {company.legalName} — {company.address.street}, {company.address.postalCode}{" "}
            {company.address.city}
          </dd>
          <dt>Téléphone</dt>
          <dd>
            <a href={company.phoneHref}>{company.phoneInternational}</a>
          </dd>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a>
          </dd>
        </dl>
      </LegalLayout>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
