# CLAUDE.md

Site AlexProReno — Next.js 16 (App Router), TypeScript, CSS Modules, React Three Fiber,
GSAP ScrollTrigger. Lire `README.md` pour l'architecture complète.

## Règle absolue sur le contenu

Ce site représente une entreprise réelle. **Ne jamais inventer** : prix, délais,
certifications, labels, garanties, avis clients, nombre de chantiers, effectifs,
années d'expérience, marques partenaires, ou réalisations. Si une information manque,
elle ne s'affiche pas — on ne comble pas avec du plausible.

Les compteurs du site WordPress d'origine étaient vides ; ils ont été retirés, pas
remplis. L'année de création reste non affichée tant que le client n'a pas arbitré
entre 2011 (ancienne maquette) et l'immatriculation RNE du 25/11/2015 (mentions légales).

## Contenu

Tout est dans `src/content/` (`site.ts`, `services.ts`, `projects.ts`). Ajouter une
prestation ou une réalisation = une entrée dans le tableau ; routes, sitemap, données
structurées et select du formulaire suivent automatiquement.

Une prestation doit renseigner `h1`, `faq`, `related` et `targets` en plus du contenu.
La `faq` est publiée telle quelle et sert de source au `FAQPage` Schema.org : n'y écrire
que des réponses vérifiables. `related` doit citer des prestations réellement
complémentaires — pas une liste alphabétique.

## Contraintes techniques à respecter

- **Contrastes** : `--stone` et `--stone-2` sur fond clair uniquement, `--stone-3` sur
  fond charbon (`--ink`). Le bronze `--bronze` ne passe pas l'AA sur fond sombre :
  utiliser `.eyebrow--light`.
- **Pas de `setState` dans un effet** : la règle ESLint `react-hooks/set-state-in-effect`
  est active. Pour lire une media query, le scroll ou le support WebGL, passer par
  `src/lib/client-hooks.ts` (`useSyncExternalStore`).
- **Rendu serveur** : ne pas introduire `useSearchParams()` dans un formulaire ou un
  contenu indexable — cela vide le HTML servi. Lire la query côté page et passer la
  valeur en prop.
- **Cadrage 3D** : les positions de caméra dans `Interior.tsx` sont calibrées pour que
  la pièce tienne dans le cadre de tous les ratios. Revérifier après toute modification
  de `parts.ts`.
- **Mouvement réduit** : chaque animation doit se neutraliser sous
  `prefers-reduced-motion`, et les contenus `[data-reveal]` rester visibles sans JS.

## Vérifier avant de livrer

```bash
npx tsc --noEmit && npm run lint && npm run build
node scripts/crawl.mjs http://localhost:3000   # doit rapporter 0 problème
```
