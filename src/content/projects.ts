/**
 * Réalisations réellement publiées par AlexProReno.
 * Ne rien ajouter ici : aucune réalisation ne doit être inventée.
 * Les descriptions se limitent à ce qui est visible sur les photos fournies.
 */

export type Project = {
  slug: string;
  title: string;
  /** Localisation telle qu'annoncée par le client. */
  location: string;
  /** Prestation rattachée (slug). */
  service: string;
  serviceLabel: string;
  summary: string;
  description: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Taille de la vignette dans la grille éditoriale. */
  size: "wide" | "tall" | "regular";
};

export const projects: Project[] = [
  {
    slug: "cuisine-contemporaine-paris-07",
    title: "Cuisine contemporaine sur mesure",
    location: "Paris 07",
    service: "cuisine-sur-mesure",
    serviceLabel: "Cuisine sur mesure",
    summary:
      "Création d'une cuisine contemporaine sur mesure, dessinée pour l'implantation existante de la pièce.",
    description: [
      "L'implantation a été dessinée à partir du relevé de la pièce : meubles bas et colonnes ajustés aux dimensions réelles, retours habillés, plan de travail et crédence posés dans la continuité.",
      "L'ensemble a été fabriqué en atelier puis ajusté sur place à la pose, avec réglage des façades et de la quincaillerie en fin de chantier.",
    ],
    image: {
      src: "/media/cuisine-paris07.webp",
      alt: "Cuisine contemporaine sur mesure réalisée par AlexProReno à Paris 7, avec meubles ajustés et plan de travail continu",
      width: 1600,
      height: 1066,
    },
    size: "wide",
  },
  {
    slug: "tete-de-lit-rangements-paris-17",
    title: "Tête de lit & rangements sur mesure",
    location: "Paris 17",
    service: "amenagement-de-chambre",
    serviceLabel: "Aménagement de chambre",
    summary:
      "Aménagement d'une chambre avec tête de lit intégrée et rangements dessinés d'un mur à l'autre.",
    description: [
      "La tête de lit et les rangements ont été traités comme un seul ouvrage, alignés sur la largeur du lit et remontés jusqu'aux volumes hauts.",
      "Les réservations pour l'éclairage et les passages de câbles ont été positionnées au dessin, avant fabrication.",
    ],
    image: {
      src: "/media/tete-de-lit-paris17.webp",
      alt: "Tête de lit et rangements sur mesure intégrés dans une chambre à Paris 17",
      width: 1500,
      height: 2000,
    },
    size: "tall",
  },
  {
    slug: "sous-escalier-villejuif",
    title: "Aménagement sur mesure sous escalier",
    location: "Villejuif",
    service: "amenagement-sous-escalier",
    serviceLabel: "Aménagement sous escalier",
    summary:
      "Transformation du volume sous escalier en rangement utilisable sur toute sa hauteur.",
    description: [
      "Le dessous d'escalier a été relevé marche par marche, puis découpé en rangements adaptés à la pente : accès en partie basse, portes ajustées sur la partie haute.",
      "Les finitions ont été alignées sur celles de la pièce pour que l'ouvrage se lise comme un élément du mur.",
    ],
    image: {
      src: "/media/sous-escalier-villejuif.webp",
      alt: "Rangements sur mesure aménagés sous un escalier à Villejuif",
      width: 1500,
      height: 2000,
    },
    size: "regular",
  },
  {
    slug: "meuble-mural-antony",
    title: "Meuble mural multifonction",
    location: "Antony",
    service: "mobilier-sur-mesure",
    serviceLabel: "Création de mobilier sur mesure",
    summary:
      "Création d'un meuble mural multifonction combinant rangements ouverts et fermés.",
    description: [
      "Le meuble a été dessiné pour son emplacement précis : largeur du pan de mur, hauteur disponible et fonctions attendues réparties entre parties ouvertes et parties fermées.",
      "Les fixations ont été adaptées au support existant et les retours habillés pour rattraper les défauts d'aplomb du mur.",
    ],
    image: {
      src: "/media/meuble-mural-antony.webp",
      alt: "Meuble mural multifonction sur mesure réalisé à Antony, mêlant rangements ouverts et fermés",
      width: 1536,
      height: 2048,
    },
    size: "regular",
  },
  {
    slug: "espace-mansarde-juvisy",
    title: "Optimisation d'un espace mansardé",
    location: "Juvisy",
    service: "mobilier-sur-mesure",
    serviceLabel: "Création de mobilier sur mesure",
    summary:
      "Récupération d'un volume sous pente par des rangements sur mesure suivant l'inclinaison du toit.",
    description: [
      "L'espace mansardé a été relevé point par point pour suivre la pente : la profondeur utile varie sur toute la longueur de l'ouvrage.",
      "Les rangements ont été répartis selon la hauteur disponible, du plus accessible au plus haut.",
    ],
    image: {
      src: "/media/mansarde-juvisy.webp",
      alt: "Espace mansardé optimisé par des rangements sur mesure suivant la pente du toit à Juvisy",
      width: 1500,
      height: 2000,
    },
    size: "regular",
  },
  {
    slug: "dressing-pleine-hauteur-paris-02",
    title: "Dressing pleine hauteur en bois",
    location: "Paris 02",
    service: "dressing-sur-mesure",
    serviceLabel: "Dressing sur mesure",
    summary:
      "Dressing en bois exploitant la pleine hauteur sous plafond, penderies et étagères réparties sur mesure.",
    description: [
      "Le dressing occupe toute la hauteur disponible, jusqu'au plafond : les volumes hauts servent au rangement saisonnier, la zone accessible aux penderies et aux étagères courantes.",
      "La structure a été ajustée aux murs existants, avec habillage des retours pour supprimer les jours périphériques.",
    ],
    image: {
      src: "/media/dressing-paris02.webp",
      alt: "Dressing pleine hauteur en bois réalisé sur mesure dans un appartement à Paris 2",
      width: 1500,
      height: 2000,
    },
    size: "tall",
  },
  {
    slug: "renovation-complete",
    title: "Rénovation complète",
    location: "Région parisienne",
    service: "renovation-interieure",
    serviceLabel: "Rénovation intérieure",
    summary:
      "Rénovation intérieure complète coordonnée par une seule équipe, du gros œuvre aux finitions.",
    description: [
      "Le chantier a réuni plusieurs corps d'état au sein de la même équipe : reprise des supports, revêtements, électricité, plomberie et finitions.",
      "La coordination interne évite les temps morts entre intervenants et les reprises d'un corps d'état sur l'autre.",
    ],
    image: {
      src: "/media/renovation-complete.webp",
      alt: "Intérieur entièrement rénové par AlexProReno en région parisienne",
      width: 1024,
      height: 672,
    },
    size: "wide",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsBySlugs = (slugs: string[]) =>
  slugs.map(projectBySlug).filter((p): p is Project => Boolean(p));
