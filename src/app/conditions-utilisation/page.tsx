import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { company, mediator } from "@/content/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions d'utilisation du site AlexProReno : objet, accès, responsabilité, propriété intellectuelle, liens externes, formulaire de contact et droit applicable.",
  alternates: { canonical: "/conditions-utilisation" },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Conditions d'utilisation", path: "/conditions-utilisation" },
];

const sections = [
  { id: "objet", title: "Objet" },
  { id: "acces", title: "Accès au site" },
  { id: "utilisation", title: "Utilisation du site" },
  { id: "formulaire", title: "Formulaire de demande de devis" },
  { id: "devis", title: "Valeur des informations publiées" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "liens", title: "Liens externes" },
  { id: "donnees", title: "Données personnelles" },
  { id: "modification", title: "Modification du contenu" },
  { id: "droit", title: "Droit applicable et litiges" },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Conditions d'utilisation"
        intro="Les présentes conditions encadrent l'accès et l'utilisation du site AlexProReno. Toute navigation sur le site vaut acceptation de ces conditions."
        crumbs={crumbs}
      />

      <LegalLayout sections={sections}>
        <h2 id="objet">Objet</h2>
        <p>
          Le site a pour objet de présenter l&apos;activité de {company.legalName}, entreprise de
          rénovation intervenant à Paris et en région parisienne, ses prestations, ses réalisations,
          et de permettre aux visiteurs de la contacter ou de formuler une demande de devis.
        </p>
        <p>
          Le site est un support d&apos;information et de mise en relation. Il ne constitue ni un
          site de vente en ligne, ni un espace de commande ou de paiement.
        </p>

        <h2 id="acces">Accès au site</h2>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à
          internet. Les frais liés à cet accès (matériel, connexion) restent à la charge de
          l&apos;utilisateur.
        </p>
        <p>
          {company.legalName} s&apos;efforce de maintenir le site accessible en permanence, sans
          pouvoir le garantir. L&apos;accès peut être interrompu, notamment pour des raisons de
          maintenance, de mise à jour ou pour des motifs techniques indépendants de sa volonté.
        </p>

        <h2 id="utilisation">Utilisation du site</h2>
        <p>L&apos;utilisateur s&apos;engage à :</p>
        <ul>
          <li>Utiliser le site conformément à sa destination et à la réglementation en vigueur</li>
          <li>
            Ne pas tenter d&apos;accéder de manière non autorisée aux systèmes ou aux données du
            site
          </li>
          <li>
            Ne pas perturber le fonctionnement du site, notamment par l&apos;envoi automatisé ou
            massif de requêtes
          </li>
          <li>
            Ne pas transmettre, via les formulaires, de contenus illicites, injurieux ou portant
            atteinte aux droits de tiers
          </li>
        </ul>

        <h2 id="formulaire">Formulaire de demande de devis</h2>
        <p>
          L&apos;utilisateur s&apos;engage à fournir des informations exactes lors de
          l&apos;utilisation du formulaire de demande de devis. Les fichiers transmis
          (photographies, plans) doivent respecter les formats et la taille indiqués sur le
          formulaire, et l&apos;utilisateur doit disposer des droits nécessaires sur ces contenus.
        </p>
        <p>
          L&apos;envoi d&apos;une demande de devis n&apos;engage aucune des deux parties. Il
          déclenche une prise de contact en vue de préciser le projet.
        </p>

        <h2 id="devis">Valeur des informations publiées</h2>
        <p>
          Les descriptions de prestations et de réalisations présentées sur le site sont fournies à
          titre informatif. Elles décrivent la nature des travaux réalisés et ne constituent ni un
          engagement contractuel, ni une offre de prix.
        </p>
        <p>
          Seul un devis écrit, établi après relevé sur place et accepté par le client, a valeur
          d&apos;engagement entre les parties.
        </p>

        <h2 id="propriete">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments du site — textes, images, photographies de chantiers, logos,
          graphismes, structure et éléments de conception — est protégé par le Code de la propriété
          intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, diffusion ou exploitation, totale ou partielle, sans
          autorisation écrite préalable, est interdite. Les marques et logos de fournisseurs
          éventuellement cités demeurent la propriété de leurs titulaires respectifs.
        </p>

        <h2 id="responsabilite">Responsabilité</h2>
        <p>
          {company.legalName} met tout en œuvre pour fournir des informations fiables et à jour,
          sans pouvoir garantir l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité de
          l&apos;ensemble des contenus publiés.
        </p>
        <p>
          {company.legalName} ne saurait être tenue responsable des dommages directs ou indirects
          résultant de l&apos;accès au site, de son utilisation, ou de l&apos;impossibilité d&apos;y
          accéder.
        </p>

        <h2 id="liens">Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. Ces liens sont proposés à titre
          informatif. {company.legalName} n&apos;exerce aucun contrôle sur ces sites et décline
          toute responsabilité quant à leur contenu ou à leurs pratiques.
        </p>

        <h2 id="donnees">Données personnelles</h2>
        <p>
          Le traitement des données personnelles collectées via le site est décrit dans la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>. Les
          informations relatives à l&apos;éditeur et à l&apos;hébergeur figurent dans les{" "}
          <Link href="/mentions-legales">mentions légales</Link>.
        </p>

        <h2 id="modification">Modification du contenu</h2>
        <p>
          {company.legalName} se réserve le droit de modifier, compléter ou supprimer à tout moment
          tout ou partie du contenu du site, ainsi que les présentes conditions d&apos;utilisation.
          Les conditions applicables sont celles en vigueur au moment de la consultation.
        </p>

        <h2 id="droit">Droit applicable et litiges</h2>
        <p>
          Les présentes conditions sont régies par le droit français. En cas de litige, une
          solution amiable sera recherchée avant toute action judiciaire.
        </p>
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la consommation, tout
          consommateur peut recourir gratuitement au médiateur de la consommation :{" "}
          <a href={mediator.url} target="_blank" rel="noreferrer noopener">
            {mediator.name}
          </a>
          , {mediator.address}.
        </p>
        <p>À défaut d&apos;accord, les juridictions françaises sont seules compétentes.</p>
      </LegalLayout>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
