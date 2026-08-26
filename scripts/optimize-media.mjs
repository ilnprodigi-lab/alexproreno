import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const src = process.argv[2], out = process.argv[3];
fs.mkdirSync(out, { recursive: true });
const jobs = [
  ['cuisine-paris07.jpg', 1600], ['tete-de-lit-paris17.jpg', 1400],
  ['sous-escalier-villejuif.jpg', 1400], ['meuble-mural-antony.jpg', 1400],
  ['mansarde-juvisy.jpg', 1400], ['renovation-complete.jpg', 1400],
  ['dressing-paris02.jpg', 1600], ['carrelage.png', 900],
  ['peinture.png', 900], ['electricite.png', 900],
];
for (const [file, w] of jobs) {
  const base = path.parse(file).name;
  const img = sharp(path.join(src, file)).rotate();
  const meta = await img.metadata();
  await img.resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(out, base + '.webp'));
  const s = fs.statSync(path.join(out, base + '.webp'));
  console.log(base + '.webp', meta.width + 'x' + meta.height, '->', Math.round(s.size / 1024) + 'kb');
}
for (const f of ['logo.png', 'portrait.png', 'brand-atlantic.png', 'brand-legrand.png', 'brand-schneider.png', 'brand-rockwool.png']) {
  fs.copyFileSync(path.join(src, f), path.join(out, f));
}
console.log('logos copied');
