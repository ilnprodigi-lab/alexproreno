# Graph Report - Alexproreno  (2026-09-23)

## Corpus Check
- 86 files · ~108,658 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 20, (none) 1, .ico 1)

## Summary
- 357 nodes · 617 edges · 52 communities (11 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.89)
- Token cost: 2,081,134 input · 0 output

## Community Hubs (Navigation)
- Content Data & GSAP Config
- Static Marketing Pages
- Project Dependencies & Tooling
- Realisations (Projects) Pages
- Quote Form & Email API
- Root Layout & Fonts
- Services Pages
- Content Rules & Rationale
- TypeScript Config
- 3D Interior Scene Renderer
- Project Overview & Architecture
- No-Invention Content Rule
- Color Contrast Rule
- SSR Search Params Rule
- ESLint setState Rule
- Atlantic Brand Logo
- Legrand Brand Logo
- Rockwool Brand Logo
- Schneider Electric Logo
- Custom Office Cabinetry Photo
- Oak Radiator Cover Photo
- Tiling Work Photo
- Bedroom Paint Photo
- Oak Hallway Joinery Photo
- Paris 7 Kitchen Photo
- U-Kitchen Glass Partition Photo
- U-Kitchen Entrance View Photo
- Marble Shower Overview Photo
- Marble Shower Tray Photo
- Shower After Photo
- Shower Before Photo
- Zellige Shower Photo
- Custom Closet Photo
- Electrical Work Photo
- Mosaic Parquet Entryway Photo
- AlexPro Reno Logo
- Attic Renovation Photo
- Wall Unit Photo
- Painting Work Photo
- Oak Door Detail Photo
- Owner Portrait Photo
- Complete Kitchen Renovation Photo
- Polished Concrete Bathroom Photo
- Attic Bathroom Photo
- Under-Stairs Storage Photo
- Electrical Panel Photo
- Custom Headboard Photo
- Oak Vanity WC Photo
- Zellige Corner Bench Photo
- Zellige Bench Photo
- Zellige Floor Photo
- Site URL Env Var

## God Nodes (most connected - your core abstractions)
1. `next` - 32 edges
2. `breadcrumbJsonLd()` - 22 edges
3. `company` - 16 edges
4. `compilerOptions` - 16 edges
5. `JsonLd()` - 12 edges
6. `PageHeader()` - 11 edges
7. `services` - 10 edges
8. `react` - 9 edges
9. `SectionHead()` - 8 edges
10. `serviceLabel()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `No-Invention Content Rule` --semantically_similar_to--> `No-Invention Content Rule`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `src/content/ Editorial Data Model` --semantically_similar_to--> `src/content/ Editorial Data Model`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `3D Camera Calibration Constraint` --semantically_similar_to--> `pullBack Camera Calibration`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `prefers-reduced-motion Rule` --semantically_similar_to--> `Accessibility & SEO Practices`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Founding Date 2015 (RNE Registration)` --conceptually_related_to--> `Founding Date Confirmation Pending`  [AMBIGUOUS]
  CLAUDE.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **No-Invention Content Governance** — claude_content_rule, readme_content_rule, claude_faq_schema [INFERRED 0.85]
- **3D Interior Scene Rendering Pipeline** — readme_scene_3d, readme_parts_ts, readme_interior_tsx, readme_frameloop_never [EXTRACTED 1.00]
- **Pre-delivery Verification Pipeline** — claude_verify_commands, scripts_crawl, readme_command_table [INFERRED 0.85]

## Communities (52 total, 41 thin omitted)

### Community 0 - "Content Data & GSAP Config"
Cohesion: 0.07
Nodes (36): src/content/ Editorial Data Model, nextConfig, projects.ts (7 Réalisations), services.ts (13 Prestations), src/content/ Editorial Data Model, gsap, next, src_app_a_propos_about_module (+28 more)

### Community 1 - "Static Marketing Pages"
Cohesion: 0.08
Nodes (35): AboutPage(), crumbs, metadata, sections, TermsPage(), src_app_contact_contact_module, ContactPage(), crumbs (+27 more)

### Community 2 - "Project Dependencies & Tooling"
Cohesion: 0.05
Nodes (39): eslintConfig, dependencies, gsap, @gsap/react, next, react, react-dom, resend (+31 more)

### Community 3 - "Realisations (Projects) Pages"
Cohesion: 0.09
Nodes (23): crumbs, metadata, ProjectsPage(), generateMetadata(), Params, ProjectPage(), src_app_realisations_slug_project_module, src_components_home_projectgrid_module (+15 more)

### Community 4 - "Quote Form & Email API"
Cohesion: 0.13
Nodes (26): QUOTE_FROM_EMAIL, QUOTE_TO_EMAIL, adminEmail(), clientEmail(), escape(), POST(), rateLimited(), recent (+18 more)

### Community 5 - "Root Layout & Fonts"
Cohesion: 0.10
Nodes (22): client-hooks.ts (lib/), react, src_app_globals, inter, metadata, newsreader, plexMono, RootLayout() (+14 more)

### Community 6 - "Services Pages"
Cohesion: 0.12
Nodes (22): metadata, ServicesPage(), generateMetadata(), Params, ServicePage(), src_app_prestations_slug_service_module, projectsBySlugs(), FAQ_DEVIS (+14 more)

### Community 7 - "Content Rules & Rationale"
Cohesion: 0.09
Nodes (19): FAQPage Schema.org Sourcing Rule, Founding Date 2015 (RNE Registration), prefers-reduced-motion Rule, Pre-delivery Verification Commands, Accessibility & SEO Practices, npm Scripts Command Table, Quote Form Accessibility Rules, Founding Date Confirmation Pending (+11 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "3D Interior Scene Renderer"
Cohesion: 0.22
Nodes (9): 3D Camera Calibration Constraint, Interior.tsx (3D Room Renderer), parts.ts (3D Room Description), frameloop="never" Render Suspension, hero3d.js Prototype, Interior.tsx, parts.ts, pullBack Camera Calibration (+1 more)

### Community 10 - "Project Overview & Architecture"
Cohesion: 0.40
Nodes (5): AlexProReno Site (CLAUDE.md Overview), design_handoff_alexproreno Bundle, WordPress Origin (alexproreno.fr), AlexProReno Site Architecture (README.md), Tech Stack (Next.js 16, TypeScript, CSS Modules, R3F, GSAP)

## Ambiguous Edges - Review These
- `Founding Date 2015 (RNE Registration)` → `Founding Date Confirmation Pending`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **161 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+156 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 204 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Founding Date 2015 (RNE Registration)` and `Founding Date Confirmation Pending`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `Content Data & GSAP Config` to `Static Marketing Pages`, `Project Dependencies & Tooling`, `Realisations (Projects) Pages`, `Quote Form & Email API`, `Root Layout & Fonts`, `Services Pages`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Why does `Resend Email Service` connect `Content Rules & Rationale` to `Quote Form & Email API`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _161 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Content Data & GSAP Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06801346801346801 - nodes in this community are weakly interconnected._
- **Should `Static Marketing Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07973421926910298 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._