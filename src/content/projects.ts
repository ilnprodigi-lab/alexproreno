/**
 * Réalisations réellement publiées par AlexProReno.
 * Ne rien ajouter ici : aucune réalisation ne doit être inventée.
 * Les descriptions se limitent à ce qui est visible sur les photos fournies.
 */

export type Project = {
  slug: string;
  title: string;
  /** Localisation, telle qu'annoncée par le client. Omise si non communiquée :
   *  rien ne doit être déduit ni approximé. */
  location?: string;
  /** Prestation rattachée (slug). */
  service: string;
  serviceLabel: string;
  summary: string;
  description: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Photo d'avant travaux, au même cadrage que `image`. Sa présence active
   *  le comparateur à curseur sur la fiche. */
  before?: { src: string; alt: string; width: number; height: number };
  /** Taille de la vignette dans la grille éditoriale. */
  size: "wide" | "tall" | "regular";
  /** Retenue pour la sélection de la page d'accueil. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "tableau-electrique",
    title: "Remplacement d'un tableau électrique",
    service: "electricite",
    serviceLabel: "Électricité",
    summary:
      "Remplacement d'un tableau électrique : trois rangées de protections, disjoncteur de branchement accessible et capot posé.",
    description: [
      "Le tableau est organisé en trois rangées, chacune commandée par son interrupteur différentiel, les disjoncteurs étant regroupés par circuit.",
      "Le capot est posé et les emplacements libres sont obturés. Le disjoncteur de branchement reste accessible en partie haute.",
    ],
    image: {
      src: "/media/tableau-electrique.webp",
      alt: "Tableau électrique remplacé, capot posé, avec trois rangées de disjoncteurs et un disjoncteur de branchement en partie haute",
      width: 285,
      height: 650,
    },
    size: "tall",
  },
  {
    slug: "bureau-sur-mesure",
    title: "Bureau et bibliothèque sur mesure",
    service: "amenagement-de-bureau",
    serviceLabel: "Aménagement de bureau",
    summary:
      "Aménagement d'un bureau sur mesure : plan traversant, rangements hauts jusqu'au plafond et bibliothèque à fond peint.",
    description: [
      "Le plan de travail court d'un mur à l'autre et repose sur des caissons bas, avec deux tiroirs centraux qui dégagent l'assise.",
      "La bibliothèque latérale et le fond du plan sont peints dans un bleu profond, en contraste avec les façades en chêne clair. Les meubles hauts remontent jusqu'au plafond.",
    ],
    image: {
      src: "/media/bureau-sur-mesure.webp",
      alt: "Bureau sur mesure en chêne clair avec plan de travail traversant, rangements hauts et bibliothèque à fond bleu",
      width: 980,
      height: 920,
    },
    size: "regular",
  },
  {
    slug: "chambre-peinture",
    title: "Mise en peinture d'une chambre",
    service: "peinture-et-finitions",
    serviceLabel: "Peinture & finitions",
    summary:
      "Mise en peinture d'une chambre : mur d'accent jaune moutarde, murs et plafond repris en teinte claire.",
    description: [
      "Le mur du fond est traité dans un jaune moutarde mat, les autres murs et le plafond dans une teinte claire, avec des arêtes reprises à la bande.",
      "Les appareillages ont été déposés puis reposés après séchage, et les tableaux de fenêtre sont peints jusqu'à la menuiserie.",
    ],
    image: {
      src: "/media/chambre-peinture.webp",
      alt: "Chambre repeinte avec un mur d'accent jaune moutarde, murs clairs et fenêtre donnant sur une façade haussmannienne",
      width: 1200,
      height: 1290,
    },
    size: "regular",
  },
  {
    slug: "renovation-douche",
    title: "Rénovation complète d'une douche",
    service: "renovation-interieure",
    serviceLabel: "Rénovation intérieure",
    summary:
      "Réfection d'une douche dégradée par l'humidité : dépose complète, reprise des parois et nouvelle faïence.",
    description: [
      "Avant travaux, le revêtement mural était décollé et les supports noircis par l'humidité sur toute la hauteur de la douche, jusqu'au sol carrelé.",
      "L'ensemble a été déposé, les parois reprises, puis habillées d'une faïence grand format posée à joints décalés. Un receveur extra-plat remplace l'ancien sol carrelé, et le carrelage se prolonge au sol de la pièce.",
    ],
    image: {
      src: "/media/douche-renovee-apres.webp",
      alt: "Douche rénovée après travaux, habillée d'une faïence grand format beige, avec receveur extra-plat blanc",
      width: 410,
      height: 975,
    },
    before: {
      src: "/media/douche-renovee-avant.webp",
      alt: "La même douche avant travaux : faïence décollée et supports noircis par l'humidité",
      width: 410,
      height: 975,
    },
    size: "regular",
  },
  {
    slug: "salle-de-bain-sous-combles",
    title: "Salle de bain sous combles",
    service: "renovation-interieure",
    serviceLabel: "Rénovation intérieure",
    summary:
      "Aménagement d'une salle de bain sous rampant, avec baignoire îlot et vasque posée sur tablette en bois massif.",
    description: [
      "La baignoire îlot est installée contre le mur de faïence, sous la partie haute du rampant, là où la hauteur sous plafond reste disponible.",
      "Le mur est habillé d'une faïence à motifs noir et blanc posée en damier irrégulier. La vasque repose sur une tablette en bois massif fixée en applique, alimentée par une robinetterie murale noire.",
    ],
    image: {
      src: "/media/salle-de-bain-sous-combles.webp",
      alt: "Salle de bain sous combles avec baignoire îlot, faïence à motifs noir et blanc et vasque posée sur une tablette en bois massif",
      width: 747,
      height: 1600,
    },
    size: "tall",
    featured: true,
  },
  {
    slug: "douche-italienne-zellige",
    title: "Douche à l'italienne en zellige",
    service: "pose-de-carrelage",
    serviceLabel: "Pose de carrelage",
    summary:
      "Douche à l'italienne habillée de zellige coloré, avec niche intégrée dans l'épaisseur de la paroi.",
    description: [
      "Le zellige est posé verticalement, décalé d'une rangée à l'autre, avec une alternance de teintes reprise sur les trois parois.",
      "La niche est ménagée dans l'épaisseur de la cloison et carrelée dans la continuité du mur. La colonne de douche est posée en applique, sur un axe centré.",
    ],
    image: {
      src: "/media/douche-zellige.webp",
      alt: "Douche à l'italienne entièrement habillée de zellige bleu, vert et jaune, avec niche intégrée et colonne de douche murale",
      width: 1200,
      height: 1600,
    },
    size: "regular",
    featured: true,
  },
  {
    slug: "salle-d-eau-beton-cire",
    title: "Salle d'eau en béton ciré",
    service: "renovation-interieure",
    serviceLabel: "Rénovation intérieure",
    summary:
      "Salle d'eau traitée en béton ciré, avec meuble suspendu en chêne et vasque à poser.",
    description: [
      "Les murs sont recouverts d'un béton ciré appliqué en continu, y compris dans les angles et sur les tableaux.",
      "Le meuble bas en chêne est suspendu et fermé par des portes sans poignée. La vasque est posée dessus et alimentée par une robinetterie murale. Une cloison de pavés de verre borde le plan et laisse passer la lumière.",
    ],
    image: {
      src: "/media/salle-d-eau-beton-cire.webp",
      alt: "Salle d'eau aux murs en béton ciré gris, avec meuble suspendu en chêne, vasque à poser grise et cloison de pavés de verre",
      width: 1200,
      height: 1600,
    },
    size: "regular",
    featured: true,
  },
  {
    slug: "cache-radiateur-chene",
    title: "Cache-radiateur en chêne sur mesure",
    service: "mobilier-sur-mesure",
    serviceLabel: "Création de mobilier sur mesure",
    summary:
      "Cache-radiateur sur mesure en chêne, à claire-voie, dessiné sur les cotes du radiateur en place.",
    description: [
      "Le caisson est dimensionné sur le radiateur existant : hauteur, largeur et profondeur relevées avant fabrication, pour un habillage qui vient affleurer le mur.",
      "La façade est ajourée de fentes verticales à angles arrondis, qui laissent circuler l'air. Les découpes latérales dégagent le robinet thermostatique et le raccordement.",
    ],
    image: {
      src: "/media/cache-radiateur-chene.webp",
      alt: "Cache-radiateur sur mesure en chêne à claire-voie, avec fentes verticales à angles arrondis, posé contre un mur blanc",
      width: 899,
      height: 1599,
    },
    size: "tall",
    featured: true,
  },
  {
    slug: "wc-meuble-vasque-chene",
    title: "WC avec meuble vasque sur mesure",
    service: "mobilier-sur-mesure",
    serviceLabel: "Création de mobilier sur mesure",
    summary:
      "Aménagement d'un WC avec meuble vasque en chêne sur mesure et habillage mural en zellige.",
    description: [
      "Le meuble vasque est dessiné pour la largeur disponible entre la cloison et le mur, avec une vasque encastrée dans un plan qui vient mourir contre l'habillage.",
      "Le mur du WC suspendu reçoit le même zellige que la douche, posé verticalement. Le sol est carrelé en grand format et se poursuit sous le meuble.",
    ],
    image: {
      src: "/media/wc-meuble-vasque-chene.webp",
      alt: "WC suspendu devant un mur en zellige coloré, à côté d'un meuble vasque sur mesure en chêne",
      width: 1200,
      height: 1600,
    },
    size: "regular",
  },
  {
    slug: "couloir-menuiseries-chene",
    title: "Couloir et menuiseries en chêne",
    service: "renovation-interieure",
    serviceLabel: "Rénovation intérieure",
    summary:
      "Rénovation d'un couloir : portes et huisseries plaquées chêne, parquet mosaïque et peinture.",
    description: [
      "Les portes sont plaquées chêne, à plis horizontaux marqués, et les huisseries sont habillées dans le même placage pour aligner les nus.",
      "Le parquet mosaïque court sur toute la longueur du couloir. Murs, plafond et plinthes sont repris en peinture claire.",
    ],
    image: {
      src: "/media/couloir-menuiseries-chene.webp",
      alt: "Couloir d'appartement avec portes et huisseries plaquées chêne, parquet mosaïque et murs peints en blanc",
      width: 963,
      height: 1431,
    },
    size: "regular",
  },
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
    featured: true,
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

/** Sélection affichée en page d'accueil, dans l'ordre du tableau ci-dessus. */
export const featuredProjects = projects.filter((project) => project.featured);
