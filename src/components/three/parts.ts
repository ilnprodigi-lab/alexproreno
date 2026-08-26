/**
 * Description déclarative de la scène 3D : un angle d'intérieur contemporain
 * qui s'assemble — sol, murs, baie, cuisine, dressing, mobilier, éclairage.
 *
 * `order` détermine l'ordre d'apparition ; `y` est la cote du dessous de la pièce.
 */

export type MaterialKey =
  | "plaster"
  | "plasterWarm"
  | "stone"
  | "oak"
  | "oakDeep"
  | "bronze"
  | "graphite"
  | "sage";

export type Part = {
  key: string;
  size: [number, number, number];
  /** Position du centre en x/z, cote basse en y. */
  at: [number, number, number];
  material: MaterialKey;
  order: number;
};

const parts: Part[] = [];
const push = (
  key: string,
  size: [number, number, number],
  at: [number, number, number],
  material: MaterialKey,
  order: number,
) => parts.push({ key, size, at, material, order });

/* ---- Sol : trame de carrelage 7 × 7, deux dalles bronze ---- */
const N = 7;
const TILE = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const x = (i - (N - 1) / 2) * TILE;
    const z = (j - (N - 1) / 2) * TILE;
    const accent = (i === 2 && j === 5) || (i === 5 && j === 1);
    const material: MaterialKey = accent ? "bronze" : (i + j) % 2 === 0 ? "stone" : "plasterWarm";
    push(`tile-${i}-${j}`, [TILE * 0.96, 0.1, TILE * 0.96], [x, -0.1, z], material, (i + j) * 0.05);
  }
}

/* ---- Mur du fond, avec réservation de baie entre x 0.5 et 2.5 ---- */
const WALL_BASE = 0.72;
for (let i = 0; i < N; i++) {
  const x = (i - (N - 1) / 2) * TILE;
  const order = WALL_BASE + i * 0.05;
  if (i === 4 || i === 5) {
    push(`back-low-${i}`, [TILE * 0.98, 0.85, 0.14], [x, 0, -3.5], "plaster", order);
    push(`back-high-${i}`, [TILE * 0.98, 0.5, 0.14], [x, 2.4, -3.5], "plaster", order + 0.03);
  } else {
    push(`back-${i}`, [TILE * 0.98, 2.9, 0.14], [x, 0, -3.5], "plaster", order);
  }
}

/* ---- Mur de gauche ---- */
for (let j = 0; j < N; j++) {
  const z = (j - (N - 1) / 2) * TILE;
  push(`left-${j}`, [0.14, 2.9, TILE * 0.98], [-3.5, 0, z], "plasterWarm", WALL_BASE + j * 0.05);
}

/* ---- Menuiserie de la baie ---- */
const WIN = 1.12;
push("win-sill", [2.16, 0.1, 0.3], [1.5, 0.85, -3.5], "stone", WIN);
push("win-left", [0.09, 1.55, 0.16], [0.5, 0.85, -3.5], "graphite", WIN + 0.04);
push("win-right", [0.09, 1.55, 0.16], [2.5, 0.85, -3.5], "graphite", WIN + 0.06);
push("win-mullion", [0.06, 1.5, 0.14], [1.5, 0.9, -3.5], "graphite", WIN + 0.08);
push("win-head", [2.16, 0.09, 0.16], [1.5, 2.4, -3.5], "graphite", WIN + 0.1);

/* ---- Cuisine sur mesure ---- */
const KIT = 1.36;
push("kit-base", [2.6, 0.86, 0.62], [-1.5, 0, -3.1], "oak", KIT);
push("kit-top", [2.72, 0.07, 0.68], [-1.5, 0.86, -3.08], "stone", KIT + 0.08);
push("kit-splash", [2.6, 0.52, 0.05], [-1.5, 0.93, -3.38], "plasterWarm", KIT + 0.14);
push("kit-upper", [2.2, 0.62, 0.36], [-1.66, 1.72, -3.25], "oakDeep", KIT + 0.2);
push("kit-island", [1.85, 0.86, 0.82], [-1.2, 0, -1.2], "oak", KIT + 0.3);
push("kit-island-top", [2, 0.08, 0.97], [-1.2, 0.86, -1.2], "stone", KIT + 0.36);

/* ---- Dressing sur mesure ---- */
const DRESS = 1.78;
push("dress-body", [0.62, 2.5, 2.2], [-3.06, 0, 1.4], "oak", DRESS);
push("dress-cornice", [0.72, 0.09, 2.32], [-3.06, 2.5, 1.4], "oakDeep", DRESS + 0.08);
push("dress-groove-1", [0.05, 2.4, 0.04], [-2.74, 0.05, 0.68], "oakDeep", DRESS + 0.12);
push("dress-groove-2", [0.05, 2.4, 0.04], [-2.74, 0.05, 2.12], "oakDeep", DRESS + 0.15);

/* ---- Mobilier sur mesure ---- */
const FURN = 2;
push("bench", [0.92, 0.44, 2], [2.6, 0, 0.6], "oak", FURN);
push("bench-box", [0.52, 0.52, 0.52], [2.6, 0.44, 1.35], "bronze", FURN + 0.08);
push("shelf", [1.5, 0.07, 0.32], [2.55, 1.55, -3.28], "oakDeep", FURN + 0.14);
push("table", [1.05, 0.36, 1.05], [0.75, 0, 1.7], "sage", FURN + 0.2);

/* ---- Éclairage suspendu ---- */
const LIGHT = 2.26;
push("cord-1", [0.03, 0.62, 0.03], [-1.62, 2.24, -1.2], "graphite", LIGHT);
push("pendant-1", [0.22, 0.24, 0.22], [-1.62, 2, -1.2], "bronze", LIGHT + 0.04);
push("cord-2", [0.03, 0.48, 0.03], [-0.78, 2.38, -1.2], "graphite", LIGHT + 0.06);
push("pendant-2", [0.22, 0.24, 0.22], [-0.78, 2.14, -1.2], "bronze", LIGHT + 0.1);

export const sceneParts = parts;
export const maxOrder = parts.reduce((max, p) => Math.max(max, p.order), 0);

/** Parties supprimées sur petits écrans pour alléger la scène. */
export const isLightweight = (part: Part) =>
  !part.key.startsWith("dress-groove") &&
  part.key !== "cord-2" &&
  part.key !== "pendant-2" &&
  part.key !== "kit-splash";

export type Hotspot = {
  id: string;
  label: string;
  href: string;
  position: [number, number, number];
};

/** Repères visuels dans la scène. La navigation réelle passe par la liste HTML. */
export const hotspots: Hotspot[] = [
  {
    id: "cuisine",
    label: "Cuisine sur mesure",
    href: "/prestations/cuisine-sur-mesure",
    position: [-1.5, 1.5, -2.9],
  },
  {
    id: "fenetres",
    label: "Remplacement de fenêtres",
    href: "/prestations/remplacement-de-fenetres",
    position: [1.5, 2.55, -3.4],
  },
  {
    id: "dressing",
    label: "Dressing sur mesure",
    href: "/prestations/dressing-sur-mesure",
    position: [-3, 2.1, 1.4],
  },
  {
    id: "mobilier",
    label: "Mobilier sur mesure",
    href: "/prestations/mobilier-sur-mesure",
    position: [2.6, 1.05, 1.35],
  },
  {
    id: "carrelage",
    label: "Pose de carrelage",
    href: "/prestations/pose-de-carrelage",
    position: [1.6, 0.08, 2.2],
  },
  {
    id: "peinture",
    label: "Peinture & finitions",
    href: "/prestations/peinture-et-finitions",
    position: [-3.4, 2.5, -1.6],
  },
];
