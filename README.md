# AlexProReno — site

Site de l'entreprise de rénovation AlexProReno (Paris et région parisienne).
Next.js 16 (App Router) · TypeScript · CSS Modules · React Three Fiber · GSAP ScrollTrigger.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | serveur de développement (http://localhost:3000) |
| `npm run build` | build de production |
| `npm start` | serveur de production |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | vérification TypeScript |
| `node scripts/crawl.mjs http://localhost:3000` | audit type crawler (statuts, H1, métadonnées, alt, liens, sitemap, 404) |
| `node scripts/optimize-media.mjs <source> public/media` | recompression des visuels en WebP |

## Variables d'environnement

Voir `.env.example`. **Aucune clé ne doit être exposée côté client** : seule
`NEXT_PUBLIC_SITE_URL` est publique.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique, Open Graph, sitemap |
| `RESEND_API_KEY` | envoi des emails de devis (https://resend.com) |
| `QUOTE_TO_EMAIL` | destinataire(s), séparés par des virgules (défaut `alexalcalapro@gmail.com`) |
| `QUOTE_FROM_EMAIL` | expéditeur, sur un domaine vérifié dans Resend |

Sans `RESEND_API_KEY`, l'API accepte la demande, la journalise côté serveur avec un
avertissement, et renvoie `delivered: false` : l'interface adapte alors sa confirmation
plutôt que d'annoncer un email qui n'est jamais parti.

## Où se trouve le contenu

Tout le contenu éditorial est centralisé dans `src/content/`, sans CMS :

- `site.ts` — coordonnées, horaires, identité légale, étapes du chantier, engagements,
  et `serviceAreas` (arrondissements et communes réellement desservis)
- `services.ts` — les 13 prestations et leurs pages détaillées
- `projects.ts` — les 7 réalisations publiées

Chaque prestation porte, en plus de son contenu : `h1` (titre qualifié géographiquement),
`faq` (alimente la section Questions fréquentes **et** le `FAQPage` Schema.org),
`related` (maillage interne contextuel), `targets` (intentions de recherche visées,
documentation interne non affichée) et `seo` (title / meta description).

Ajouter une prestation ou une réalisation = ajouter une entrée dans le tableau
correspondant. Les routes, le sitemap, les données structurées et le select du
formulaire de devis se mettent à jour automatiquement.

### Règle de contenu

Le site ne publie que des informations vérifiées. **Ne pas ajouter** de prix, délais,
certifications, labels, garanties, avis clients, nombre de chantiers, effectifs ou
années d'expérience tant que le client ne les a pas fournis. Les compteurs du site
WordPress d'origine (« projets », « clients », « effectifs ») étaient vides : ils ont
été retirés plutôt que remplis avec des valeurs inventées.

## Architecture

```
src/
  app/                      routes (App Router)
    api/devis/route.ts      réception du formulaire, envoi Resend, anti-spam
    prestations/[slug]/     13 pages générées statiquement
    realisations/[slug]/    7 pages générées statiquement
    devis/                  formulaire, prérempli via ?prestation=<slug>
    mentions-legales/ politique-de-confidentialite/ conditions-utilisation/
    robots.ts sitemap.ts not-found.tsx
  components/
    layout/                 Header, Footer, barre d'action mobile
    home/                   Hero, Craft, ServiceGrid, ProjectGrid, Process, Trust, ContactCta
    three/                  scène 3D (parts.ts décrit la pièce, Interior.tsx la rend)
    quote/                  formulaire de devis
    ui/                     SectionHead, PageHeader, LegalLayout, Reveal, Parallax, JsonLd
  content/                  données éditoriales
  lib/                      seo.ts, quote.ts (schéma zod partagé), client-hooks.ts
```

## Scène 3D

`components/three/` assemble un angle d'intérieur contemporain : sol carrelé, murs,
baie, cuisine, dressing, mobilier, suspensions. `parts.ts` décrit chaque volume avec
un `order` qui pilote son apparition.

Comportement selon le contexte :

| Contexte | Rendu |
| --- | --- |
| Desktop, mouvement normal | assemblage et caméra pilotés par le scroll sur une zone dédiée |
| Écran < 900 px ou `prefers-reduced-motion` | scène statique déjà assemblée, sans scroll-scrub, géométrie allégée |
| Pas de WebGL | bloc de repli textuel |

Le module three.js n'est téléchargé qu'à l'approche du viewport, et le rendu est
suspendu (`frameloop="never"`) dès que la scène en sort. Les repères dans la scène sont
décoratifs : la navigation réelle passe par la liste de liens sous le canvas, présente
dans le HTML servi et donc accessible aux lecteurs d'écran comme aux crawlers.

Les positions de caméra sont calibrées pour que la pièce reste entièrement dans le
cadre du 21:9 au format quasi carré (`pullBack` dans `Interior.tsx`). Toute
modification de la géométrie demande de revérifier ce cadrage.

## Accessibilité et SEO

- Un `h1` unique par page, hiérarchie de titres continue, HTML sémantique
- `title`, meta description, canonical, Open Graph sur les 29 pages
- Données structurées `HomeAndConstructionBusiness`, `Service`, `FAQPage`, `ItemList`,
  `BreadcrumbList` — construites uniquement à partir de `src/content/`
- `robots.txt` et `sitemap.xml` générés, toutes les URL du sitemap atteignables par la navigation
- Aucune page orpheline : `scripts/crawl.mjs` vérifie les liens entrants de chaque page
- Contrastes vérifiés (AA) ; `--stone`/`--stone-2` sur fond clair, `--stone-3` sur fond charbon
- Formulaire : `label` sur chaque champ, `fieldset`/`legend`, `aria-invalid`,
  `aria-describedby`, focus porté sur la première erreur, confirmation en `role="status"`
- `prefers-reduced-motion` respecté partout ; sans JavaScript, les contenus révélés au
  scroll restent visibles (`<noscript>` dans le layout)

## Points en attente côté client

1. Chiffres réels (projets livrés, clients, effectifs) si un bandeau de statistiques est souhaité
2. Photos haute résolution, et éventuels avant/après
3. Année de création à confirmer : l'ancienne maquette annonçait 2011, les mentions
   légales indiquent une immatriculation au RNE le 25 novembre 2015. Aucune année
   n'est affichée comme argument commercial en attendant l'arbitrage.
4. Compte Resend et domaine vérifié pour l'envoi des devis
5. Confirmer si une page dédiée « Rénovation de salle de bain » doit être créée : le sujet
   est aujourd'hui traité dans les pages Plomberie et Rénovation intérieure, sans page propre

## Origine

Les contenus proviennent du site WordPress alexproreno.fr (accueil, mentions légales,
politique de confidentialité) et du bundle de handoff `../alexproreno/design_handoff_alexproreno/`.
La direction artistique et l'ensemble du code sont nouveaux ; seule la logique
d'assemblage 3D reprend l'idée du prototype `hero3d.js`.
