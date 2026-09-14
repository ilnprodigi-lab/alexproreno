/**
 * Source unique des informations de l'entreprise.
 * Toutes les valeurs sont vérifiées (site alexproreno.fr + mentions légales publiées).
 * Ne rien ajouter ici qui ne soit pas confirmé par le client.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexproreno.fr";

export const company = {
  name: "AlexProReno",
  legalName: "ALEX PRO RENO",
  legalForm: "Entreprise individuelle",
  owner: "Manuel Alejandro Alcala Figueroa",
  founderFirstName: "Alejandro",
  founderRole: "Gérant, AlexProReno",
  tagline: "Rénovation tous corps d'état en région parisienne",
  baseline:
    "Entreprise spécialisée en rénovation intérieure sur mesure. Travail soigné, équipe engagée, suivi personnalisé.",
  phone: "07 82 47 53 39",
  phoneHref: "tel:+33782475339",
  phoneInternational: "+33 7 82 47 53 39",
  /** Adresse publiée sur le site, affichée aux visiteurs. */
  email: "alexproreno91@gmail.com",
  emailHref: "mailto:alexproreno91@gmail.com",
  /** Adresse publiée dans les mentions légales, et destinataire des devis. */
  legalEmail: "alexalcalapro@gmail.com",
  instagram: "https://www.instagram.com/alexpro9878",
  address: {
    street: "121 rue Manin",
    postalCode: "75019",
    city: "Paris",
    country: "France",
  },
  siren: "814 964 037",
  siret: "814 964 037 00018",
  vat: "FR42 814964037",
  ape: "41.20A — Construction de maisons individuelles",
  rneRegistration: "25 novembre 2015",
  /** Arbitré par le client : l'année retenue est celle de l'immatriculation. */
  foundingYear: "2015",
  area: "Paris et région parisienne",
  areaShort: "Île-de-France",
  hours: "Du lundi au vendredi de 7h30 à 17h, le samedi de 7h à 17h30",
  hoursShort: "Lun – ven 7h30 – 17h · Sam 7h – 17h30",
} as const;

/**
 * Secteurs d'intervention mis en avant.
 * Les arrondissements listés sont ceux où l'entreprise intervient couramment ;
 * les communes proviennent des réalisations réellement publiées.
 * Ne pas allonger cette liste sans confirmation du client.
 */
export const serviceAreas = {
  districts: [
    { label: "Paris 2e", detail: "Bourse, Sentier" },
    { label: "Paris 3e", detail: "Temple, Arts-et-Métiers" },
    { label: "Paris 4e", detail: "Marais, Hôtel-de-Ville" },
    { label: "Paris 7e", detail: "Invalides, Gros-Caillou" },
    { label: "Paris 8e", detail: "Champs-Élysées, Madeleine" },
    { label: "Paris 16e", detail: "Passy, Auteuil" },
    { label: "Paris 17e", detail: "Batignolles, Ternes" },
  ],
  sectors: ["République", "Marais", "Rive gauche"],
  towns: ["Villejuif", "Antony", "Juvisy-sur-Orge"],
} as const;

/** Formulations locales réutilisées dans les contenus et les métadonnées. */
export const localPhrases = {
  short: "à Paris et en Île-de-France",
  business: "Entreprise de rénovation à Paris et en Île-de-France",
  region: "Paris et région parisienne",
} as const;

export const host = {
  name: "HOSTINGER INTERNATIONAL LTD",
  address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
  url: "https://www.hostinger.fr",
} as const;

export const mediator = {
  name: "CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice",
  address: "49 rue de Ponthieu, 75008 Paris",
  url: "https://www.cm2c.net",
  email: "cm2c@cm2c.net",
} as const;

/** Marques de fournisseurs citées par l'entreprise sur son site. */
export const brands = [
  { name: "Atlantic", src: "/media/brand-atlantic.png", width: 300, height: 80 },
  { name: "Legrand", src: "/media/brand-legrand.png", width: 300, height: 300 },
  { name: "Schneider Electric", src: "/media/brand-schneider.png", width: 300, height: 200 },
  { name: "Rockwool", src: "/media/brand-rockwool.png", width: 300, height: 93 },
] as const;

export const mainNav = [
  { label: "Prestations", href: "/prestations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Méthode", href: "/#methode" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
] as const;

/** Les 5 étapes affichées sur le site actuel du client. */
export const processSteps = [
  {
    number: "01",
    title: "Écoute & prise de contact",
    text: "On comprend l'usage, les contraintes et le budget avant de parler travaux.",
  },
  {
    number: "02",
    title: "Relevé technique & prise de mesures",
    text: "Chaque cote est relevée sur place, au millimètre, avant tout dessin.",
  },
  {
    number: "03",
    title: "Devis détaillé & validation",
    text: "Postes, matériaux et déroulé du chantier sont écrits noir sur blanc. Gratuit et sans engagement.",
  },
  {
    number: "04",
    title: "Fabrication & préparation",
    text: "Approvisionnement chez nos fournisseurs, pièces préparées et ajustées en amont.",
  },
  {
    number: "05",
    title: "Installation & finitions",
    text: "Pose, réglages, nettoyage. Nous ne quittons le chantier qu'une fois terminé.",
  },
] as const;

/** Piliers du savoir-faire, repris du site actuel. */
export const pillars = [
  {
    title: "Mesure, rigueur, qualité d'exécution",
    text: "Un alignement parfait, une coupe nette, un angle sans défaut : c'est là que se joue la différence.",
  },
  {
    title: "Des artisans qualifiés",
    text: "Formés aux techniques actuelles et attachés au travail bien fait — de la salle de bain au bâti ancien.",
  },
  {
    title: "Un résultat durable",
    text: "Irréprochable jusque dans les moindres finitions, avec des matériaux de marques reconnues.",
  },
] as const;

/** Engagements affichés sur le site actuel. */
export const commitments = [
  {
    title: "Le travail en équipe",
    text: "Des professionnels engagés sur chaque chantier, un objectif commun : livrer un résultat impeccable.",
  },
  {
    title: "Un engagement total",
    text: "Du premier rendez-vous à la réception : délais, budgets et attentes respectés.",
  },
  {
    title: "Un travail soigné",
    text: "Les détails font la différence : un résultat net, propre et durable, du matériau à la pose.",
  },
  {
    title: "Un suivi de proximité",
    text: "Réactif et personnalisé, avant, pendant et après les travaux. Une question ? On répond.",
  },
] as const;

export const founderQuote =
  "Arrivé en France en 2008, j'ai vite compris que ma passion pour le travail bien fait pouvait devenir une vraie valeur ajoutée. J'ai fondé AlexProReno avec une idée simple : des réalisations soignées, durables, et à l'image de chaque client.";
