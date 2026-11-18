// Pre-sizes images for the Cloudflare static export, where there is no
// next/image optimisation server. Writes WebP variants to public/_img/ at the
// widths lib/static-image-loader.ts asks for. Run by `npm run build:cloudflare`.
//   node scripts/build-images.mjs
import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const WIDTHS = [256, 384, 640, 828, 1200, 1440]; // keep in sync with lib/static-image-loader.ts
const QUALITY = 72;
const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
const outDir = join(pub, "_img");

// Images rendered with next/image: page images and video posters.
const sources = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(name)) sources.push(p);
  }
};
walk(join(pub, "images"));
for (const name of readdirSync(join(pub, "video"))) if (name.endsWith("-poster.webp")) sources.push(join(pub, "video", name));

let written = 0;
for (const file of sources) {
  const rel = relative(pub, file).replace(/\.[a-z]+$/i, "");
  const { width: original = 0 } = await sharp(file).metadata();
  for (const w of WIDTHS) {
    const target = join(outDir, `${rel}-${w}.webp`);
    if (existsSync(target) && statSync(target).mtimeMs > statSync(file).mtimeMs) continue;
    mkdirSync(dirname(target), { recursive: true });
    // Never upscale: a width larger than the source gets the source size.
    await sharp(file).resize({ width: Math.min(w, original), withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(target);
    written++;
  }
}
console.log(`Static images: ${sources.length} sources, ${written} variants written to public/_img/`);
