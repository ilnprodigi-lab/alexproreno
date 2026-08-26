/**
 * Audit type crawler : parcourt le site depuis la racine, vérifie les statuts,
 * la structure des titres, les métadonnées, le maillage interne et le sitemap.
 * Usage : node scripts/crawl.mjs http://localhost:3100
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const TITLE_MIN = 25;
const TITLE_MAX = 65;
const DESC_MIN = 110;
const DESC_MAX = 170;

const seen = new Set();
const queue = ["/"];
const problems = [];
const warnings = [];
const pages = [];
/** path → nombre de pages qui pointent vers lui */
const inbound = new Map();

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? null;
const strip = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) {
    problems.push(`${res.status} → ${path}`);
    continue;
  }
  const html = await res.text();

  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => strip(m[1]));
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null;
  const descTag = html.match(/<meta name="description"[^>]*>/i)?.[0];
  const description = descTag ? attr(descTag, "content") : null;
  const canonicalTag = html.match(/<link rel="canonical"[^>]*>/i)?.[0];
  const canonical = canonicalTag ? attr(canonicalTag, "href") : null;
  const ogTag = html.match(/<meta property="og:title"[^>]*>/i)?.[0];
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((tag) => !/\salt="[^"]+"/i.test(tag)).length;
  // Cibler la balise entière : la chaîne « application/ld+json » apparaît aussi
  // dans la charge utile React sérialisée, ce qui produisait de faux positifs.
  const jsonLd = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ]
    .map((m) => {
      try {
        return JSON.parse(m[1])["@type"];
      } catch {
        problems.push(`JSON-LD invalide → ${path}`);
        return "invalide";
      }
    });
  const headingOrder = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));

  if (h1.length !== 1) problems.push(`H1 x${h1.length} → ${path}`);
  if (!title) problems.push(`title manquant → ${path}`);
  if (!description) problems.push(`meta description manquante → ${path}`);
  if (!canonical) problems.push(`canonical manquant → ${path}`);
  if (!ogTag) problems.push(`og:title manquant → ${path}`);
  if (imgsNoAlt > 0) problems.push(`${imgsNoAlt} image(s) sans alt → ${path}`);
  if (title && (title.length < TITLE_MIN || title.length > TITLE_MAX))
    warnings.push(`title ${title.length} car. (viser ${TITLE_MIN}-${TITLE_MAX}) → ${path}`);
  if (description && (description.length < DESC_MIN || description.length > DESC_MAX))
    warnings.push(`description ${description.length} car. (viser ${DESC_MIN}-${DESC_MAX}) → ${path}`);
  if (h2.length === 0) warnings.push(`aucun H2 → ${path}`);

  let previous = 0;
  for (const level of headingOrder) {
    if (previous && level > previous + 1) {
      problems.push(`saut de niveau h${previous} → h${level} → ${path}`);
      break;
    }
    previous = level;
  }

  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    links.add(clean);
    if (!seen.has(clean)) queue.push(clean);
  }
  for (const target of links) {
    if (target !== path) inbound.set(target, (inbound.get(target) ?? 0) + 1);
  }

  pages.push({
    path,
    title: title?.slice(0, 58),
    tLen: title?.length ?? 0,
    dLen: description?.length ?? 0,
    h1: h1[0]?.slice(0, 44),
    h2: h2.length,
    imgs: imgs.length,
    jsonLd: jsonLd.join("+"),
    sortants: links.size,
  });
}

for (const page of pages) page.entrants = inbound.get(page.path) ?? 0;

console.log(`\n${pages.length} pages explorées depuis ${BASE}\n`);
console.table(pages);

const orphans = pages.filter((p) => p.entrants === 0 && p.path !== "/");
if (orphans.length) problems.push(`page(s) orpheline(s) : ${orphans.map((p) => p.path).join(", ")}`);

for (const file of ["/robots.txt", "/sitemap.xml"]) {
  const res = await fetch(BASE + file);
  console.log(`${file} → ${res.status}`);
  if (!res.ok) problems.push(`${file} inaccessible`);
  if (file === "/sitemap.xml" && res.ok) {
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    console.log(`  ${urls.length} URL dans le sitemap`);
    for (const url of urls) {
      const path = new URL(url).pathname;
      if (!seen.has(path)) problems.push(`sitemap: ${path} non atteignable par la navigation`);
    }
    for (const page of pages) {
      const inSitemap = urls.some((u) => new URL(u).pathname === page.path);
      if (!inSitemap) warnings.push(`hors sitemap : ${page.path}`);
    }
  }
}

const notFound = await fetch(BASE + "/une-page-qui-nexiste-pas");
console.log(`/une-page-qui-nexiste-pas → ${notFound.status} (attendu 404)`);
if (notFound.status !== 404) problems.push("la route inconnue ne renvoie pas 404");

console.log(`\n${problems.length} problème(s)`);
problems.forEach((p) => console.log("  ✗ " + p));
console.log(`${warnings.length} avertissement(s)`);
warnings.forEach((w) => console.log("  ! " + w));
