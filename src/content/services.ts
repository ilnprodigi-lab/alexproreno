/**
 * Prestations AlexProReno.
 *
 * Règle de contenu : on décrit uniquement la nature du travail réalisé.
 * Aucun prix, délai, label, certification, garantie ou performance technique
 * n'est mentionné tant que le client ne les a pas confirmés.
 *
 * Règle SEO : chaque page vise un besoin réel et une intention de recherche
 * distincte. Les formulations locales restent naturelles — pas de répétition
 * mécanique de « Paris » dans chaque phrase.
 */

export type Service = {
  slug: string;
  number: string;
  /** Nom court de la prestation : cartes, navigation, fil d'Ariane. */
  title: string;
  /** Titre H1 de la page, qualifié géographiquement. */
  h1: string;
  /** Libellé court utilisé dans le select du formulaire de devis. */
  formLabel: string;
  /** Accroche affichée sur la carte de la grille. */
  excerpt: string;
  /** Paragraphe d'introduction de la page détaillée. */
  intro: string;
  /** Ce que nous réalisons. */
  scope: string[];
  /** Notre accompagnement. */
  support: string;
  /** Pourquoi faire appel à AlexProReno, spécifique à la prestation. */
  reasons: { title: string; text: string }[];
  /** Questions réellement posées avant un chantier. Alimente aussi le FAQPage. */
  faq: { question: string; answer: string }[];
  image: { src: string; alt: string; width: number; height: number };
  /** Slugs des réalisations à mettre en avant sur la page. */
  projects: string[];
  /** Prestations complémentaires — maillage interne contextuel, pas alphabétique. */
  related: string[];
  seo: { title: string; description: string };
  /** Intentions de recherche couvertes. Documentation interne, non affichée. */
  targets: string[];
  /** Prestation historique du site (vs. ajoutée à la refonte). */
  featured?: boolean;
};

const IMG = {
  cuisine: {
    src: "/media/cuisine-paris07.webp",
    alt: "Cuisine contemporaine sur mesure réalisée par AlexProReno dans un appartement du 7e arrondissement de Paris",
    width: 1600,
    height: 1066,
  },
  dressing: {
    src: "/media/dressing-paris02.webp",
    alt: "Dressing sur mesure en bois montant jusqu'au plafond, réalisé dans un appartement du 2e arrondissement de Paris",
    width: 1500,
    height: 2000,
  },
  teteDeLit: {
    src: "/media/tete-de-lit-paris17.webp",
    alt: "Tête de lit et rangements sur mesure intégrés dans une chambre du 17e arrondissement de Paris",
    width: 1500,
    height: 2000,
  },
  sousEscalier: {
    src: "/media/sous-escalier-villejuif.webp",
    alt: "Rangements sur mesure aménagés sous un escalier dans une maison à Villejuif",
    width: 1500,
    height: 2000,
  },
  meubleMural: {
    src: "/media/meuble-mural-antony.webp",
    alt: "Meuble mural multifonction sur mesure, rangements ouverts et fermés, réalisé à Antony",
    width: 1536,
    height: 2048,
  },
  mansarde: {
    src: "/media/mansarde-juvisy.webp",
    alt: "Rangements sur mesure suivant la pente du toit dans un espace mansardé à Juvisy-sur-Orge",
    width: 1500,
    height: 2000,
  },
  renovation: {
    src: "/media/renovation-complete.webp",
    alt: "Intérieur entièrement rénové par AlexProReno en région parisienne",
    width: 1024,
    height: 672,
  },
  carrelage: {
    src: "/media/carrelage.webp",
    alt: "Carrelage posé par AlexProReno, joints réguliers et coupes ajustées",
    width: 300,
    height: 300,
  },
  peinture: {
    src: "/media/peinture.webp",
    alt: "Travaux de peinture intérieure réalisés par AlexProReno sur des murs préparés et poncés",
    width: 300,
    height: 300,
  },
  electricite: {
    src: "/media/electricite.webp",
    alt: "Travaux d'électricité réalisés par AlexProReno dans le cadre d'une rénovation",
    width: 1536,
    height: 1024,
  },
} as const;

const REASON_MESURE = {
  title: "Un relevé au millimètre",
  text: "Chaque cote est prise sur place avant tout dessin. C'est ce qui permet à l'ouvrage de se poser sans jeu ni rattrapage visible.",
};
const REASON_INTERLOCUTEUR = {
  title: "Un seul interlocuteur",
  text: "Tous corps d'état réunis dans une même équipe : vous n'avez pas à coordonner plusieurs entreprises entre elles.",
};
const REASON_FINITION = {
  title: "La finition comme critère",
  text: "Le chantier n'est terminé que lorsque les réglages sont faits et les lieux nettoyés. C'est le dernier centimètre qui se voit.",
};

/** Réponses factuelles réutilisables : uniquement des informations publiées. */
const FAQ_ZONE = {
  question: "Dans quels secteurs intervenez-vous ?",
  answer:
    "Nous intervenons à Paris et en région parisienne. Nos chantiers récents se situent notamment dans les 2e, 7e et 17e arrondissements, ainsi qu'à Villejuif, Antony et Juvisy-sur-Orge. Indiquez le code postal du chantier dans votre demande, nous vous confirmons rapidement.",
};
const FAQ_DEVIS = {
  question: "Le devis est-il payant ?",
  answer:
    "Non. Le devis est gratuit et sans engagement. Il est établi après un relevé sur place, et détaille les postes, les matériaux et le déroulé du chantier.",
};

export const services: Service[] = [
  {
    slug: "renovation-interieure",
    number: "01",
    title: "Rénovation intérieure",
    h1: "Rénovation intérieure à Paris et en Île-de-France",
    formLabel: "Rénovation intérieure",
    excerpt:
      "Rénovation d'appartement, de maison ou d'une pièce isolée : nous coordonnons l'ensemble des corps d'état, du démontage à la dernière finition.",
    intro:
      "La rénovation intérieure est le cœur de notre métier. AlexProReno intervient sur la rénovation complète d'un appartement ou d'une maison comme sur des travaux partiels limités à une pièce, en réunissant dans une seule équipe les métiers nécessaires au projet : démolition et dépose, cloisons, électricité, plomberie, revêtements de sols, menuiserie et peinture. Vous gardez un seul interlocuteur du premier rendez-vous à la réception du chantier.",
    scope: [
      "Rénovation complète d'un appartement ou d'une maison",
      "Rénovation partielle limitée à une ou deux pièces",
      "Démolition, dépose et évacuation des éléments existants",
      "Cloisonnement : création, modification ou dépose de cloisons",
      "Ouverture de mur et pose d'IPN, en lien avec la prestation dédiée",
      "Reprise des sols, des murs et des plafonds",
      "Reprise des réseaux électriques et de plomberie dans le cadre du projet",
      "Revêtements de sols : carrelage, parquet, faïence",
      "Menuiseries et aménagements sur mesure intégrés à la rénovation",
      "Peinture et finitions",
    ],
    support:
      "Nous commençons par comprendre l'usage réel de votre logement, vos contraintes et votre budget avant de parler travaux. Le relevé technique sur place précède le devis, qui détaille les postes, les matériaux et le déroulé du chantier. Pendant les travaux, vous êtes tenu au courant de l'avancement et des points de décision.",
    reasons: [REASON_INTERLOCUTEUR, REASON_MESURE, REASON_FINITION],
    faq: [
      {
        question: "Rénovez-vous un appartement entier ou seulement certaines pièces ?",
        answer:
          "Les deux. Nous prenons en charge la rénovation complète d'un logement comme des travaux partiels sur une seule pièce. Le périmètre est arrêté avec vous au moment du relevé, et le devis suit exactement ce périmètre.",
      },
      {
        question: "Faut-il quitter le logement pendant les travaux ?",
        answer:
          "Cela dépend de l'ampleur du chantier et des pièces concernées. Nous en discutons lors du relevé : sur une rénovation partielle, il est souvent possible de rester sur place en organisant les interventions pièce par pièce.",
      },
      {
        question: "Combien coûte une rénovation intérieure ?",
        answer:
          "Le montant dépend de la surface, de l'état de l'existant et des postes retenus — un logement à rafraîchir et un bâti ancien à reprendre n'ont rien de comparable. Nous ne communiquons pas de tarif au mètre carré : le chiffrage est établi après relevé sur place, poste par poste.",
      },
      FAQ_ZONE,
    ],
    image: IMG.renovation,
    projects: ["renovation-complete", "cuisine-contemporaine-paris-07", "espace-mansarde-juvisy"],
    related: [
      "pose-d-ipn",
      "plomberie",
      "electricite",
      "peinture-et-finitions",
      "pose-de-carrelage",
      "remplacement-de-fenetres",
    ],
    seo: {
      title: "Rénovation d'appartement et de maison à Paris",
      description:
        "Entreprise de rénovation à Paris : appartement, maison, rénovation complète ou partielle. Tous corps d'état, une seule équipe. Devis gratuit.",
    },
    targets: [
      "entreprise rénovation Paris",
      "entreprise de rénovation à Paris",
      "rénovation intérieure Paris",
      "rénovation appartement Paris",
      "rénovation maison Paris",
      "rénovation complète Paris",
      "travaux de rénovation Paris",
      "artisan rénovation Paris",
    ],
    featured: true,
  },
  {
    slug: "pose-d-ipn",
    number: "02",
    title: "Pose d'IPN",
    h1: "Pose d'IPN et ouverture de mur porteur à Paris",
    formLabel: "Pose d'IPN / ouverture de mur porteur",
    excerpt:
      "Ouvrir un mur porteur pour agrandir une pièce : étaiement, ouverture et pose de la poutre IPN, sur la base de l'étude structure fournie.",
    intro:
      "Ouvrir un mur porteur transforme un logement cloisonné en espace continu. AlexProReno réalise ces travaux à Paris et en région parisienne : mise en place de l'étaiement, ouverture, pose de la poutre IPN et reprise de charge, puis habillage et finitions. Ce type d'intervention ne s'improvise pas — elle s'appuie sur une étude structure établie par un bureau d'études ou un ingénieur, et sur les autorisations requises lorsque le logement est en copropriété.",
    scope: [
      "Étaiement de la zone avant ouverture",
      "Ouverture du mur selon les dimensions définies par l'étude structure",
      "Pose de la poutre IPN et mise en charge",
      "Réalisation des appuis et scellements prévus au plan",
      "Évacuation des gravats",
      "Habillage de la poutre et reprise des tableaux",
      "Reprise des sols, des murs et des plafonds autour de l'ouverture",
    ],
    support:
      "Avant tout chiffrage, nous constatons la configuration sur place et vous indiquons les pièces nécessaires : étude structure établie par un bureau d'études ou un ingénieur, et — en copropriété — l'autorisation de l'assemblée générale. Nous ne réalisons ni les calculs de charge ni les validations réglementaires : nous exécutons les travaux sur la base des éléments techniques qui nous sont remis, et nous vous disons franchement si un point doit être tranché avant d'ouvrir.",
    reasons: [
      {
        title: "Le cadre posé avant le premier coup",
        text: "Étude structure, autorisations, étaiement : nous vérifions que tout est réuni avant l'ouverture, plutôt que de découvrir un manque une fois le mur entamé.",
      },
      {
        title: "L'ouverture et la reprise dans la même main",
        text: "Sols, murs et plafonds sont repris autour de la poutre dans la foulée : l'ouverture ne laisse pas un chantier de finitions à confier à quelqu'un d'autre.",
      },
      REASON_INTERLOCUTEUR,
    ],
    faq: [
      {
        question: "Réalisez-vous l'étude structure et les calculs de charge ?",
        answer:
          "Non. L'étude structure et le dimensionnement de la poutre relèvent d'un bureau d'études ou d'un ingénieur structure. Nous réalisons les travaux sur la base de cette étude et vous indiquons, dès le relevé, les documents à réunir.",
      },
      {
        question: "Faut-il une autorisation pour ouvrir un mur porteur en copropriété ?",
        answer:
          "Oui. Un mur porteur relève des parties communes : l'ouverture doit être autorisée par l'assemblée générale des copropriétaires, sur la base de l'étude technique. Nous en tenons compte dans l'organisation du chantier, mais la démarche vous appartient.",
      },
      {
        question: "Comment savoir si mon mur est porteur ?",
        answer:
          "L'épaisseur, la position dans le bâtiment et la nature du matériau donnent des indices, mais aucun n'est concluant à lui seul. Seule une étude technique permet de trancher. Nous constatons la configuration lors du relevé et vous orientons vers la vérification nécessaire.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.renovation,
    projects: ["renovation-complete"],
    related: [
      "renovation-interieure",
      "peinture-et-finitions",
      "electricite",
      "pose-de-carrelage",
    ],
    seo: {
      title: "Pose d'IPN à Paris — ouverture de mur porteur",
      description:
        "Pose d'IPN et ouverture de mur porteur à Paris : étaiement, mise en charge et reprise des finitions, sur la base de l'étude structure. Devis gratuit.",
    },
    targets: [
      "pose IPN Paris",
      "pose de IPN Paris",
      "installation IPN Paris",
      "entreprise pose IPN Paris",
      "ouverture mur porteur Paris",
      "renforcement structure Paris",
    ],
    featured: true,
  },
  {
    slug: "cuisine-sur-mesure",
    number: "03",
    title: "Cuisine sur mesure",
    h1: "Cuisine sur mesure et rénovation de cuisine à Paris",
    formLabel: "Cuisine sur mesure / rénovation de cuisine",
    excerpt:
      "Une cuisine dessinée pour votre pièce, pas pour un catalogue : implantation, façades, plan de travail et rangements.",
    intro:
      "Une cuisine sur mesure part de la pièce et de la façon dont vous y cuisinez, pas d'un module standard qu'il faudrait rattraper avec des joints de finition. Que vous rénoviez une cuisine existante ou en créiez une dans un logement remis à nu, nous relevons l'existant, dessinons l'implantation, puis fabriquons et posons les éléments en tenant compte des réseaux, des ouvertures et des circulations.",
    scope: [
      "Dépose de la cuisine existante lors d'une rénovation",
      "Étude d'implantation et calepinage des façades",
      "Meubles bas, meubles hauts et colonnes ajustés aux dimensions réelles",
      "Habillage des retours, angles et trémies",
      "Pose du plan de travail et de la crédence",
      "Reprise des arrivées d'eau et des alimentations électriques nécessaires",
      "Raccordements liés à la pose des appareils et de l'évier",
      "Ajustement des portes, tiroirs et quincaillerie",
    ],
    support:
      "Nous partons de vos habitudes : ce que vous rangez, ce que vous utilisez tous les jours, ce que vous voulez cacher. L'implantation est arrêtée avec vous avant fabrication, et le devis détaille les matériaux retenus poste par poste.",
    reasons: [
      REASON_MESURE,
      {
        title: "Chaque centimètre exploité",
        text: "Angles, retours, hauteurs sous plafond irrégulières : le sur-mesure sert d'abord à récupérer le volume qu'un meuble standard laisse perdu.",
      },
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Prenez-vous en charge la plomberie et l'électricité de la cuisine ?",
        answer:
          "Oui. Les arrivées d'eau, les évacuations et les alimentations électriques nécessaires à l'implantation retenue font partie du chantier, sans avoir à faire intervenir une autre entreprise.",
      },
      {
        question: "Peut-on rénover une cuisine sans tout démolir ?",
        answer:
          "Souvent, oui. Selon l'état de l'existant, il est possible de conserver une partie des réseaux ou du support et de reprendre façades, plan de travail et crédence. Le relevé sur place permet de trancher.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.cuisine,
    projects: ["cuisine-contemporaine-paris-07", "renovation-complete"],
    related: [
      "renovation-interieure",
      "plomberie",
      "electricite",
      "pose-de-carrelage",
      "mobilier-sur-mesure",
    ],
    seo: {
      title: "Cuisine sur mesure à Paris — rénovation de cuisine",
      description:
        "Conception, fabrication et pose de cuisines sur mesure à Paris et en Île-de-France. Rénovation de cuisine complète, implantation dessinée pour votre pièce. Devis gratuit.",
    },
    targets: [
      "cuisine sur mesure Paris",
      "rénovation cuisine Paris",
      "rénovation de cuisine Paris",
      "aménagement cuisine Paris",
    ],
    featured: true,
  },
  {
    slug: "dressing-sur-mesure",
    number: "04",
    title: "Dressing sur mesure",
    h1: "Dressing sur mesure à Paris et en Île-de-France",
    formLabel: "Dressing sur mesure",
    excerpt:
      "Pleine hauteur, sous pente ou en niche : un rangement dessiné autour de ce que vous avez réellement à ranger.",
    intro:
      "Un dressing sur mesure se dessine à partir de son contenu : longueur de penderie, nombre d'étagères, tiroirs, hauteur libre. Dans les appartements parisiens, où la hauteur sous plafond est souvent généreuse et les murs rarement d'équerre, c'est le sur-mesure qui permet d'exploiter tout le volume disponible sans laisser de jour périphérique.",
    scope: [
      "Relevé de la niche ou du mur à équiper",
      "Répartition penderies, étagères, tiroirs et rangements hauts",
      "Structure et façades ajustées à la pleine hauteur",
      "Habillage des retours et rattrapage des murs non d'équerre",
      "Portes battantes ou coulissantes selon le dégagement disponible",
      "Adaptation aux sous-pentes et aux combles",
      "Réglage de la quincaillerie et finitions",
    ],
    support:
      "Nous listons avec vous ce qui doit être rangé avant de dessiner quoi que ce soit. Le plan est validé ensemble, puis les pièces sont préparées en amont pour limiter la durée d'intervention chez vous.",
    reasons: [
      {
        title: "La pleine hauteur utilisée",
        text: "Jusqu'au plafond, y compris sur les hauteurs sous plafond parisiennes : le volume haut sert au rangement saisonnier plutôt qu'à prendre la poussière.",
      },
      REASON_MESURE,
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Un dressing sur mesure est-il possible dans une petite chambre ?",
        answer:
          "Oui, et c'est souvent là qu'il apporte le plus. Une faible profondeur bien répartie, des portes coulissantes quand le dégagement manque, et la pleine hauteur exploitée permettent de ranger dans un volume qu'un meuble standard ne couvrirait pas.",
      },
      {
        question: "Travaillez-vous sous pente ou dans les combles ?",
        answer:
          "Oui. La profondeur utile varie alors sur toute la longueur de l'ouvrage : le relevé se fait point par point pour suivre l'inclinaison, comme sur notre chantier de Juvisy-sur-Orge.",
      },
      FAQ_ZONE,
    ],
    image: IMG.dressing,
    projects: ["dressing-pleine-hauteur-paris-02", "tete-de-lit-rangements-paris-17"],
    related: [
      "amenagement-de-chambre",
      "mobilier-sur-mesure",
      "amenagement-sous-escalier",
      "renovation-interieure",
    ],
    seo: {
      title: "Dressing sur mesure à Paris et en Île-de-France",
      description:
        "Dressings sur mesure pleine hauteur, sous pente ou en niche, conçus et posés par AlexProReno à Paris et en région parisienne. Devis gratuit et sans engagement.",
    },
    targets: [
      "dressing sur mesure Paris",
      "dressing pleine hauteur Paris",
      "aménagement dressing Paris",
    ],
    featured: true,
  },
  {
    slug: "amenagement-de-chambre",
    number: "05",
    title: "Aménagement de chambre",
    h1: "Aménagement de chambre sur mesure à Paris",
    formLabel: "Aménagement de chambre",
    excerpt:
      "Tête de lit intégrée, rangements périphériques, chevets et éclairage : la chambre traitée comme un ensemble.",
    intro:
      "Aménager une chambre, c'est traiter le lit et ses abords comme un seul ouvrage : tête de lit, rangements au-dessus et sur les côtés, chevets intégrés, passages de câbles pour les liseuses. L'ensemble est dessiné d'un mur à l'autre pour éviter les espaces perdus entre meubles.",
    scope: [
      "Tête de lit sur mesure, avec ou sans rangement intégré",
      "Rangements hauts et latéraux alignés sur le lit",
      "Chevets intégrés et réservations pour l'éclairage",
      "Placards et penderies en complément",
      "Adaptation aux sous-pentes et aux combles",
      "Peinture et finitions de la pièce",
    ],
    support:
      "Nous relevons la pièce, positionnons le lit et vérifions les circulations avant de figer le dessin. Les réservations électriques sont anticipées avec vous pour que rien ne soit repris après coup.",
    reasons: [
      REASON_MESURE,
      {
        title: "Un ensemble, pas des meubles juxtaposés",
        text: "Tête de lit, rangements et chevets sont dessinés ensemble : pas d'interstice entre deux meubles, pas de recoin impossible à nettoyer.",
      },
      REASON_FINITION,
    ],
    faq: [
      {
        question: "L'éclairage et les prises sont-ils prévus dans l'ouvrage ?",
        answer:
          "Oui, à condition d'en parler avant fabrication. Les réservations pour liseuses, prises et passages de câbles sont positionnées au dessin, ce qui évite les reprises visibles une fois la tête de lit posée.",
      },
      {
        question: "Refaites-vous aussi les murs et la peinture de la chambre ?",
        answer:
          "Oui. Préparation des supports, peinture des murs et des plafonds peuvent être intégrées au même chantier, ce qui évite de faire revenir une autre entreprise après la pose.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.teteDeLit,
    projects: ["tete-de-lit-rangements-paris-17", "espace-mansarde-juvisy"],
    related: [
      "dressing-sur-mesure",
      "mobilier-sur-mesure",
      "peinture-et-finitions",
      "electricite",
    ],
    seo: {
      title: "Aménagement de chambre sur mesure à Paris",
      description:
        "Têtes de lit, rangements intégrés et aménagement de chambre sur mesure à Paris et en Île-de-France par AlexProReno. Devis gratuit et sans engagement.",
    },
    targets: [
      "aménagement chambre sur mesure Paris",
      "tête de lit sur mesure Paris",
      "rangement chambre Paris",
    ],
  },
  {
    slug: "amenagement-de-bureau",
    number: "06",
    title: "Aménagement de bureau",
    h1: "Aménagement de bureau sur mesure à Paris",
    formLabel: "Aménagement de bureau",
    excerpt:
      "Un poste de travail intégré au logement : plan, rangements, gestion des câbles et éclairage.",
    intro:
      "Un bureau à domicile tient rarement dans une pièce dédiée, surtout dans un appartement parisien. Nous l'intégrons là où c'est possible — pan de mur, niche, retour de couloir, angle de séjour — avec un plan à la bonne hauteur, des rangements au-dessus et une gestion des câbles pensée dès le départ.",
    scope: [
      "Plan de travail sur mesure, fixe ou en retour",
      "Rangements hauts, étagères et caissons",
      "Passages et réservations pour les câbles et les prises",
      "Intégration dans une niche, un angle ou un mur complet",
      "Éclairage du poste de travail",
      "Peinture et finitions",
    ],
    support:
      "Nous partons de votre matériel et de votre façon de travailler : profondeur de plan utile, hauteur d'assise, nombre de prises. Le tout est arrêté avant fabrication.",
    reasons: [
      REASON_MESURE,
      {
        title: "Les câbles prévus, pas subis",
        text: "Réservations, passe-câbles et emplacements de prises sont positionnés au dessin, avant la pose.",
      },
      REASON_INTERLOCUTEUR,
    ],
    faq: [
      {
        question: "Peut-on aménager un bureau sans pièce dédiée ?",
        answer:
          "C'est le cas le plus fréquent. Un retour de couloir, une niche ou un angle de séjour suffisent souvent, à condition de dessiner le plan et les rangements pour cet emplacement précis plutôt que d'y caler un meuble du commerce.",
      },
      {
        question: "Ajoutez-vous les prises nécessaires au poste de travail ?",
        answer:
          "Oui. La création ou le déplacement de prises et de points lumineux fait partie de nos prestations d'électricité et peut être intégré au même chantier.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.meubleMural,
    projects: ["meuble-mural-antony", "renovation-complete"],
    related: [
      "mobilier-sur-mesure",
      "electricite",
      "renovation-interieure",
      "peinture-et-finitions",
    ],
    seo: {
      title: "Aménagement de bureau sur mesure à Paris",
      description:
        "Bureaux et postes de travail sur mesure intégrés au logement, réalisés par AlexProReno à Paris et en Île-de-France. Devis gratuit et sans engagement.",
    },
    targets: [
      "aménagement bureau sur mesure Paris",
      "bureau sur mesure Paris",
      "coin bureau appartement Paris",
    ],
  },
  {
    slug: "amenagement-sous-escalier",
    number: "07",
    title: "Aménagement sous escalier",
    h1: "Aménagement sous escalier sur mesure en Île-de-France",
    formLabel: "Aménagement sous escalier",
    excerpt:
      "Le volume le plus difficile à exploiter devient du rangement utile : tiroirs, portes et niches sur mesure.",
    intro:
      "Le dessous d'escalier est un volume en triangle que rien de standard ne vient remplir correctement. Nous le relevons marche par marche et le transformons en rangement réellement utilisable : tiroirs profonds à l'avant, portes sur la partie haute, niches ouvertes là où la profondeur le permet.",
    scope: [
      "Relevé du limon, des marches et des hauteurs disponibles",
      "Tiroirs coulissants sur la partie basse",
      "Portes et trappes ajustées à la pente",
      "Niches ouvertes ou étagères sur la partie haute",
      "Habillage complet du dessous d'escalier",
      "Finitions alignées sur le reste de la pièce",
    ],
    support:
      "Nous vérifions sur place ce qui est réellement stockable dans le volume avant de proposer une répartition. Le dessin tient compte du sens d'ouverture et du dégagement devant l'escalier.",
    reasons: [
      {
        title: "Un volume récupéré en entier",
        text: "Jusqu'à la dernière marche : la partie basse, souvent abandonnée, est traitée en tiroirs pour rester accessible.",
      },
      REASON_MESURE,
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Que peut-on réellement ranger sous un escalier ?",
        answer:
          "La partie haute accueille ce qui se range debout — manteaux, aspirateur, cartons. La partie basse, trop plate pour une porte, devient utile en tiroirs coulissants : chaussures, outillage, saisonnier. Nous vérifions le contenu visé avant de figer la répartition.",
      },
      {
        question: "L'ouvrage s'intègre-t-il au reste de la pièce ?",
        answer:
          "Oui. Les finitions sont alignées sur celles de la pièce pour que l'ensemble se lise comme un élément du mur plutôt que comme un meuble rapporté, comme sur notre chantier de Villejuif.",
      },
      FAQ_ZONE,
    ],
    image: IMG.sousEscalier,
    projects: ["sous-escalier-villejuif", "meuble-mural-antony"],
    related: ["mobilier-sur-mesure", "dressing-sur-mesure", "renovation-interieure"],
    seo: {
      title: "Aménagement sous escalier sur mesure",
      description:
        "Rangements sur mesure sous escalier — tiroirs, portes et niches — conçus et posés par AlexProReno à Paris et en région parisienne. Devis gratuit.",
    },
    targets: [
      "aménagement sous escalier Paris",
      "rangement sous escalier sur mesure",
      "placard sous escalier Île-de-France",
    ],
  },
  {
    slug: "mobilier-sur-mesure",
    number: "08",
    title: "Création de mobilier sur mesure",
    h1: "Création de mobilier sur mesure à Paris",
    formLabel: "Création de mobilier sur mesure",
    excerpt:
      "Meubles muraux, bibliothèques, banquettes, meubles d'entrée : des pièces dessinées pour un emplacement précis.",
    intro:
      "Quand aucun meuble du commerce ne tombe juste, nous le dessinons et le fabriquons. Meuble mural multifonction, bibliothèque toute hauteur, banc d'entrée avec rangement, habillage de radiateur : la pièce est pensée pour son emplacement, ses contraintes et son usage.",
    scope: [
      "Meubles muraux et bibliothèques sur mesure",
      "Meubles d'entrée, bancs et assises avec rangement",
      "Habillages de radiateur, de trémie ou de coffre",
      "Étagères et niches intégrées à la maçonnerie",
      "Combinaison de rangements ouverts et fermés",
      "Fixations adaptées au support existant",
    ],
    support:
      "Nous partons de l'emplacement et de la fonction attendue, puis proposons une répartition et des matériaux. Le meuble est préparé en amont et ajusté sur place à la pose.",
    reasons: [
      REASON_MESURE,
      {
        title: "Fabriqué pour un emplacement unique",
        text: "Le meuble épouse le mur existant, ses défauts d'aplomb et ses réservations, au lieu d'être calé avec des cales invisibles.",
      },
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Fabriquez-vous à partir d'un plan que je fournis ?",
        answer:
          "Oui, comme à partir d'une simple intention. Dans les deux cas, nous relevons l'emplacement sur place : c'est ce relevé qui conditionne l'ajustement final, pas le plan seul.",
      },
      {
        question: "Le meuble peut-il intégrer un radiateur ou une trémie ?",
        answer:
          "Oui. Habillages de radiateur, coffres et trémies font partie des contraintes courantes : elles sont prises en compte au dessin, avec les ventilations et les accès nécessaires.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.meubleMural,
    projects: ["meuble-mural-antony", "espace-mansarde-juvisy", "sous-escalier-villejuif"],
    related: [
      "dressing-sur-mesure",
      "amenagement-de-bureau",
      "amenagement-sous-escalier",
      "amenagement-de-chambre",
    ],
    seo: {
      title: "Mobilier sur mesure à Paris et en Île-de-France",
      description:
        "Meubles muraux, bibliothèques et mobilier sur mesure conçus et fabriqués par AlexProReno à Paris et en région parisienne. Devis gratuit et sans engagement.",
    },
    targets: [
      "mobilier sur mesure Paris",
      "meuble sur mesure Paris",
      "bibliothèque sur mesure Paris",
      "menuiserie sur mesure Île-de-France",
    ],
    featured: true,
  },
  {
    slug: "plomberie",
    number: "09",
    title: "Plomberie",
    h1: "Travaux de plomberie à Paris et en Île-de-France",
    formLabel: "Plomberie",
    excerpt:
      "Alimentation, évacuation et pose d'appareils sanitaires, dans le cadre d'une rénovation ou d'une intervention ciblée.",
    intro:
      "AlexProReno réalise les travaux de plomberie liés à vos projets de rénovation comme les interventions ponctuelles : reprise d'alimentation et d'évacuation, déplacement d'un point d'eau, rénovation d'une salle de bain, remplacement et pose d'appareils sanitaires. Nos interventions sont planifiées : nous ne proposons pas de service de dépannage d'urgence.",
    scope: [
      "Alimentation en eau chaude et eau froide",
      "Réseaux d'évacuation",
      "Déplacement ou création d'un point d'eau",
      "Rénovation de salle de bain : dépose, réseaux, pose des sanitaires",
      "Pose et remplacement d'appareils sanitaires",
      "Raccordements en cuisine et en salle de bain",
      "Reprise des habillages, du carrelage et des finitions après intervention",
    ],
    support:
      "Nous constatons l'existant sur place avant de chiffrer : nature des réseaux, accès, contraintes de copropriété éventuelles. Les postes sont détaillés dans le devis, et les reprises de finition après travaux y sont incluses.",
    reasons: [
      REASON_INTERLOCUTEUR,
      {
        title: "Les reprises comprises",
        text: "Une intervention de plomberie touche souvent au carrelage ou à la cloison : nous refermons et reprenons les finitions plutôt que de laisser la reprise à un autre corps d'état.",
      },
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Intervenez-vous en urgence, la nuit ou le week-end ?",
        answer:
          "Non. Nous intervenons du lundi au vendredi, de 8h à 18h, sur des chantiers planifiés. Pour une fuite ou une panne nécessitant une intervention immédiate, il faut faire appel à un service de dépannage d'urgence.",
      },
      {
        question: "Rénovez-vous une salle de bain complète ?",
        answer:
          "Oui. Dépose de l'existant, reprise des alimentations et des évacuations, pose des sanitaires, carrelage et faïence, électricité et peinture : l'ensemble est réalisé par la même équipe.",
      },
      {
        question: "Refermez-vous les saignées et le carrelage après intervention ?",
        answer:
          "Oui. Les reprises de finition — cloison, carrelage, peinture — sont chiffrées avec les travaux plutôt que laissées à votre charge.",
      },
    ],
    image: IMG.renovation,
    projects: ["renovation-complete"],
    related: [
      "renovation-interieure",
      "pose-de-carrelage",
      "cuisine-sur-mesure",
      "electricite",
    ],
    seo: {
      title: "Plomberie à Paris — travaux et rénovation",
      description:
        "Travaux de plomberie à Paris : alimentation, évacuation, rénovation de salle de bain, pose de sanitaires. Chantiers planifiés, devis gratuit.",
    },
    targets: [
      "plomberie Paris",
      "travaux plomberie Paris",
      "rénovation plomberie Paris",
      "installation plomberie Paris",
      "plombier rénovation Paris",
      "rénovation salle de bain Paris",
    ],
  },
  {
    slug: "remplacement-de-fenetres",
    number: "10",
    title: "Remplacement de fenêtres",
    h1: "Remplacement de fenêtres à Paris et en Île-de-France",
    formLabel: "Remplacement de fenêtres",
    excerpt:
      "Dépose des menuiseries existantes, pose des nouvelles et reprise complète des finitions intérieures.",
    intro:
      "Le changement d'une fenêtre se joue autant sur la pose que sur la reprise autour : c'est là que se voient les défauts. Nous déposons la menuiserie existante, posons la nouvelle d'aplomb, puis reprenons les tableaux, l'appui et les finitions intérieures. Dans les immeubles parisiens, chaque baie a ses propres cotes : elles sont relevées une à une.",
    scope: [
      "Relevé des dimensions et de l'état du dormant existant",
      "Dépose de la menuiserie en place",
      "Pose de la nouvelle menuiserie, mise d'aplomb et calage",
      "Traitement des jonctions et étanchéité périphérique",
      "Remplacement de portes et de portes-fenêtres",
      "Reprise des tableaux, de l'appui et des habillages intérieurs",
      "Réglage des ouvrants et de la quincaillerie",
    ],
    support:
      "Nous relevons chaque baie individuellement — les dimensions varient d'une ouverture à l'autre dans un même logement. Les contraintes d'accès et de copropriété sont vérifiées avant le devis, qui précise le type de pose retenu.",
    reasons: [
      REASON_MESURE,
      {
        title: "La reprise intérieure incluse",
        text: "Tableaux, appuis et habillages sont repris dans la foulée : la fenêtre neuve ne laisse pas un chantier de peinture derrière elle.",
      },
      REASON_INTERLOCUTEUR,
    ],
    faq: [
      {
        question: "Faut-il une autorisation de copropriété pour changer ses fenêtres ?",
        answer:
          "Le plus souvent, oui : les fenêtres participent à l'aspect extérieur de l'immeuble, et leur remplacement est encadré par le règlement de copropriété. Nous vous signalons le point lors du relevé, mais la démarche vous appartient.",
      },
      {
        question: "Remplacez-vous aussi les portes-fenêtres et les portes ?",
        answer:
          "Oui. Portes-fenêtres et portes intérieures relèvent de la même intervention : dépose, pose d'aplomb, réglage des ouvrants et reprise des habillages.",
      },
      {
        question: "Faut-il refaire la peinture après la pose ?",
        answer:
          "La reprise des tableaux et des habillages intérieurs est comprise dans nos travaux. Si vous souhaitez repeindre l'ensemble de la pièce, cela peut être intégré au même chantier.",
      },
    ],
    image: IMG.renovation,
    projects: ["renovation-complete", "espace-mansarde-juvisy"],
    related: ["renovation-interieure", "peinture-et-finitions", "pose-d-ipn"],
    seo: {
      title: "Remplacement de fenêtres à Paris — dépose et pose",
      description:
        "Changement et pose de fenêtres à Paris : dépose des menuiseries, pose d'aplomb et reprise complète des finitions intérieures. Devis gratuit.",
    },
    targets: [
      "remplacement fenêtre Paris",
      "remplacement de fenêtres Paris",
      "changement fenêtre Paris",
      "pose fenêtre Paris",
      "entreprise remplacement fenêtre Paris",
      "rénovation fenêtres Paris",
    ],
  },
  {
    slug: "peinture-et-finitions",
    number: "11",
    title: "Peinture & finitions",
    h1: "Peinture intérieure et extérieure à Paris",
    formLabel: "Peinture & finitions",
    excerpt:
      "Murs, plafonds et façades. Préparation des supports, application soignée, arêtes nettes.",
    intro:
      "La peinture est le moment où tout le chantier se voit. Qu'il s'agisse de repeindre un appartement entier ou une seule pièce, nous accordons autant d'attention à la préparation des supports qu'à l'application : rebouchage, ponçage, traitement des fissures, protection des ouvrages, puis application en couches régulières et arêtes nettes.",
    scope: [
      "Préparation des supports : rebouchage, enduit, ponçage",
      "Traitement des fissures et des reprises",
      "Peinture des murs et des plafonds",
      "Peinture extérieure et façades",
      "Boiseries, portes et huisseries",
      "Protection des sols et des ouvrages pendant l'intervention",
    ],
    support:
      "Nous travaillons avec des peintures professionnelles Guittet et Tollens. Le choix des teintes et des finitions est arrêté avec vous, et l'état des supports est constaté avant chiffrage.",
    reasons: [
      {
        title: "La préparation avant l'application",
        text: "Un support mal préparé se voit à la première lumière rasante : le temps passé en amont conditionne le rendu final.",
      },
      REASON_FINITION,
      REASON_INTERLOCUTEUR,
    ],
    faq: [
      {
        question: "Repeignez-vous un appartement occupé ?",
        answer:
          "Oui, en organisant l'intervention pièce par pièce et en protégeant les sols et le mobilier. Le déroulé est arrêté avec vous lors du relevé.",
      },
      {
        question: "Les fissures sont-elles traitées avant la peinture ?",
        answer:
          "Oui. Rebouchage, enduit, ponçage et traitement des fissures font partie de la préparation. C'est ce travail préalable qui conditionne le rendu final, en particulier sous une lumière rasante.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.peinture,
    projects: ["renovation-complete", "cuisine-contemporaine-paris-07"],
    related: [
      "renovation-interieure",
      "pose-de-carrelage",
      "remplacement-de-fenetres",
      "amenagement-de-chambre",
    ],
    seo: {
      title: "Peinture intérieure et extérieure à Paris",
      description:
        "Travaux de peinture à Paris et en Île-de-France : peinture d'appartement, murs, plafonds, boiseries et façades. Préparation des supports soignée. Devis gratuit.",
    },
    targets: [
      "peinture appartement Paris",
      "travaux peinture Paris",
      "peintre rénovation Paris",
      "peinture intérieure Paris",
    ],
    featured: true,
  },
  {
    slug: "pose-de-carrelage",
    number: "12",
    title: "Pose de carrelage",
    h1: "Pose de carrelage et revêtements de sol à Paris",
    formLabel: "Pose de carrelage / revêtements de sol",
    excerpt:
      "Préparation du support, calepinage, alignement rigoureux et joints réguliers, au sol comme en faïence.",
    intro:
      "La pose de carrelage se prépare avant le premier carreau : état et planéité du support, point de départ du calepinage, position des coupes. C'est ce travail préalable qui donne des lignes droites, des coupes rejetées aux bons endroits et des joints réguliers — au sol, en faïence murale comme en crédence.",
    scope: [
      "Préparation et remise à niveau du support",
      "Calepinage et définition du point de départ",
      "Pose au sol, en faïence murale et en crédence",
      "Revêtements de sol dans le cadre d'une rénovation, carrelage ou parquet",
      "Traitement des coupes, angles et retours",
      "Joints et profilés de finition",
      "Conseil sur les formats, textures et calepinages",
    ],
    support:
      "Nous vous conseillons sur le format et le calepinage en fonction de la pièce : un grand format ne se comporte pas comme une petite trame, et le sens de pose change la perception du volume.",
    reasons: [
      {
        title: "Le calepinage décidé avant la pose",
        text: "Point de départ, sens et emplacement des coupes sont arrêtés au préalable, pour que les coupes tombent là où on ne les regarde pas.",
      },
      REASON_MESURE,
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Faut-il déposer l'ancien carrelage ?",
        answer:
          "Pas systématiquement. Selon l'état, l'adhérence et la hauteur disponible sous les portes, une pose sur l'existant peut être envisageable. Le constat sur place permet de trancher.",
      },
      {
        question: "Posez-vous aussi du parquet ?",
        answer:
          "Oui, dans le cadre d'une rénovation : les revêtements de sol font partie des postes que nous prenons en charge avec le reste du chantier.",
      },
      FAQ_ZONE,
    ],
    image: IMG.carrelage,
    projects: ["renovation-complete", "cuisine-contemporaine-paris-07"],
    related: [
      "renovation-interieure",
      "plomberie",
      "peinture-et-finitions",
      "cuisine-sur-mesure",
    ],
    seo: {
      title: "Pose de carrelage à Paris — sols et faïence",
      description:
        "Pose de carrelage, de faïence et de revêtements de sol à Paris et en Île-de-France : préparation du support, calepinage et finitions soignées. Devis gratuit.",
    },
    targets: [
      "pose carrelage Paris",
      "carreleur Paris",
      "revêtement de sol Paris",
      "pose faïence Paris",
    ],
    featured: true,
  },
  {
    slug: "electricite",
    number: "13",
    title: "Électricité",
    h1: "Travaux d'électricité à Paris et en Île-de-France",
    formLabel: "Électricité",
    excerpt:
      "Installation, remplacement de tableau, création de points lumineux et de prises, dépannage.",
    intro:
      "Nous réalisons les travaux d'électricité liés à vos projets de rénovation ainsi que les interventions ciblées : création ou déplacement de points lumineux et de prises, remplacement de tableau, remise en état d'une installation ancienne. Les interventions sont planifiées, du lundi au vendredi.",
    scope: [
      "Création et déplacement de points lumineux",
      "Ajout et déplacement de prises et d'interrupteurs",
      "Remplacement de tableau électrique",
      "Reprise d'installations anciennes",
      "Alimentations dédiées pour la cuisine et l'électroménager",
      "Reprise des saignées et des finitions après intervention",
    ],
    support:
      "L'installation existante est constatée sur place avant chiffrage. Les emplacements de prises, d'interrupteurs et de points lumineux sont validés avec vous avant les saignées, quand le projet le permet.",
    reasons: [
      REASON_INTERLOCUTEUR,
      {
        title: "Les emplacements validés avant les saignées",
        text: "On repère ensemble sur les murs avant d'ouvrir : c'est le moment le moins coûteux pour changer d'avis.",
      },
      REASON_FINITION,
    ],
    faq: [
      {
        question: "Reprenez-vous les saignées et la peinture après l'intervention ?",
        answer:
          "Oui. Rebouchage des saignées, reprise des supports et peinture sont chiffrés avec les travaux d'électricité, pour ne pas laisser le logement en l'état.",
      },
      {
        question: "Peut-on ajouter des prises sans tout refaire ?",
        answer:
          "Souvent, oui. L'ajout ou le déplacement de prises et de points lumineux peut se traiter ponctuellement. Le constat sur place permet de vérifier ce que l'installation existante autorise.",
      },
      FAQ_DEVIS,
    ],
    image: IMG.electricite,
    projects: ["renovation-complete"],
    related: [
      "renovation-interieure",
      "plomberie",
      "cuisine-sur-mesure",
      "peinture-et-finitions",
    ],
    seo: {
      title: "Électricité à Paris — travaux et rénovation",
      description:
        "Travaux d'électricité à Paris : points lumineux, prises, tableau électrique, reprise d'installation ancienne. Devis gratuit.",
    },
    targets: [
      "électricité Paris",
      "travaux électricité Paris",
      "électricien rénovation Paris",
      "mise aux normes électrique Paris",
    ],
    featured: true,
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const relatedServices = (service: Service) =>
  service.related
    .map(serviceBySlug)
    .filter((s): s is Service => Boolean(s) && s!.slug !== service.slug);

/** Options du select « Prestation souhaitée » du formulaire de devis. */
export const quoteOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.formLabel })),
  { value: "autre", label: "Autre / je ne sais pas encore" },
];
