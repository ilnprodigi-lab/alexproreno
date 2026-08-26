import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { company, host } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment AlexProReno collecte et traite les données personnelles transmises via le site et le formulaire de demande de devis, conformément au RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
];

const sections = [
  { id: "responsable", title: "Responsable du traitement" },
  { id: "donnees", title: "Données collectées" },
  { id: "finalites", title: "Finalités de la collecte" },
  { id: "bases", title: "Bases légales" },
  { id: "destinataires", title: "Destinataires des données" },
  { id: "conservation", title: "Durée de conservation" },
  { id: "cookies", title: "Cookies" },
  { id: "securite", title: "Sécurité" },
  { id: "droits", title: "Vos droits" },
  { id: "reclamation", title: "Réclamation auprès de la CNIL" },
  { id: "modification", title: "Modification de la politique" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Politique de confidentialité"
        intro="Cette politique informe les utilisateurs du site sur la manière dont leurs données personnelles sont collectées et traitées, conformément au RGPD et à la loi Informatique et Libertés."
        crumbs={crumbs}
      />

      <LegalLayout sections={sections} updated="24 juin 2026">
        <h2 id="responsable">Responsable du traitement</h2>
        <dl>
          <dt>Dénomination</dt>
          <dd>{company.legalName}</dd>
          <dt>Forme juridique</dt>
          <dd>
            {company.legalForm} — {company.owner}
          </dd>
          <dt>Adresse</dt>
          <dd>
            {company.address.street}, {company.address.postalCode} {company.address.city}
          </dd>
          <dt>SIREN</dt>
          <dd>{company.siren}</dd>
          <dt>SIRET</dt>
          <dd>{company.siret}</dd>
          <dt>TVA intracommunautaire</dt>
          <dd>{company.vat}</dd>
          <dt>Activité</dt>
          <dd>{company.ape}</dd>
        </dl>
        <p>
          Pour toute question relative à la protection des données personnelles, vous pouvez nous
          écrire à <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a> ou nous
          contacter via le <Link href="/contact">formulaire de contact</Link> du site.
        </p>

        <h2 id="donnees">Données collectées</h2>
        <p>Lors de votre utilisation du site, les données suivantes peuvent être collectées :</p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse e-mail</li>
          <li>Numéro de téléphone</li>
          <li>Adresse du projet ou localisation du chantier (code postal et ville)</li>
          <li>Type de projet, prestation souhaitée et budget indicatif</li>
          <li>
            Contenu des messages et fichiers transmis via le formulaire de demande de devis
            (photos, plans)
          </li>
          <li>Adresse IP et données de navigation</li>
          <li>Données statistiques de fréquentation du site</li>
        </ul>
        <p>
          Les champs obligatoires du formulaire sont indiqués comme tels ; les autres sont
          facultatifs et peuvent être laissés vides.
        </p>

        <h2 id="finalites">Finalités de la collecte</h2>
        <p>Les données personnelles sont collectées afin de :</p>
        <ul>
          <li>Répondre aux demandes de contact et de devis</li>
          <li>Assurer le suivi commercial des projets</li>
          <li>Gérer la relation avec les clients et prospects</li>
          <li>Améliorer le fonctionnement et les performances du site</li>
          <li>Répondre aux obligations légales et réglementaires</li>
        </ul>

        <h2 id="bases">Bases légales</h2>
        <p>Les traitements reposent sur :</p>
        <ul>
          <li>Le consentement de l&apos;utilisateur lorsqu&apos;il remplit un formulaire</li>
          <li>L&apos;exécution de mesures précontractuelles ou contractuelles</li>
          <li>
            L&apos;intérêt légitime du responsable du traitement pour assurer la gestion et la
            sécurité du site
          </li>
          <li>Le respect des obligations légales</li>
        </ul>

        <h2 id="destinataires">Destinataires des données</h2>
        <p>
          Les données collectées sont exclusivement destinées à {company.legalName} et aux
          prestataires techniques intervenant dans le fonctionnement du site — notamment
          l&apos;hébergeur ({host.name}) et le service d&apos;acheminement des emails transactionnels
          utilisé pour transmettre les demandes de devis.
        </p>
        <p>
          Aucune donnée personnelle n&apos;est vendue ou cédée à des tiers à des fins commerciales.
        </p>

        <h2 id="conservation">Durée de conservation</h2>
        <ul>
          <li>Prospects : 3 ans à compter du dernier contact</li>
          <li>
            Clients : pendant toute la durée de la relation commerciale, puis conformément aux
            obligations légales applicables
          </li>
          <li>Cookies de mesure d&apos;audience : 13 mois maximum</li>
        </ul>

        <h2 id="cookies">Cookies</h2>
        <p>
          Le site peut utiliser des cookies nécessaires à son bon fonctionnement ainsi que des
          cookies de mesure d&apos;audience. L&apos;utilisateur peut à tout moment paramétrer ou
          désactiver les cookies depuis son navigateur.
        </p>

        <h2 id="securite">Sécurité</h2>
        <p>
          {company.legalName} met en œuvre des mesures techniques et organisationnelles appropriées
          afin d&apos;assurer la sécurité et la confidentialité des données personnelles contre
          toute perte, altération ou accès non autorisé.
        </p>

        <h2 id="droits">Vos droits</h2>
        <p>Conformément au RGPD, chaque utilisateur dispose des droits suivants :</p>
        <ul>
          <li>Droit d&apos;accès</li>
          <li>Droit de rectification</li>
          <li>Droit d&apos;effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d&apos;opposition</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit de retirer son consentement à tout moment</li>
        </ul>
        <p>
          Toute demande peut être adressée par email à{" "}
          <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a>.
        </p>

        <h2 id="reclamation">Réclamation auprès de la CNIL</h2>
        <p>
          En cas de litige, l&apos;utilisateur peut introduire une réclamation auprès de la
          Commission Nationale de l&apos;Informatique et des Libertés :
        </p>
        <dl>
          <dt>Autorité</dt>
          <dd>CNIL</dd>
          <dt>Adresse</dt>
          <dd>3 Place de Fontenoy — TSA 80715, 75334 Paris Cedex 07</dd>
          <dt>Site internet</dt>
          <dd>
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer noopener">
              www.cnil.fr
            </a>
          </dd>
        </dl>

        <h2 id="modification">Modification de la politique</h2>
        <p>
          {company.legalName} se réserve le droit de modifier la présente politique de
          confidentialité à tout moment afin d&apos;assurer sa conformité avec les évolutions
          législatives et réglementaires. Les utilisateurs sont invités à la consulter
          régulièrement.
        </p>
      </LegalLayout>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
