import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { rm, stat, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", {
  paths: [dirname(require.resolve("next/package.json"))],
}));
const assets = resolve(import.meta.dirname, "../public/capabilities");
const article = process.argv[2] ?? "msa";
if (!["msa", "data-mapping", "aml", "mass-payout", "design-to-production"].includes(article)) {
  throw new Error(`Unknown article image set: ${article}`);
}
const prefix = article === "msa" ? "msa-fig" : article;
const manifest = {};

// Keep the 2x PNG exports as masters; encode all delivered sizes losslessly.
const figureCount = article === "design-to-production" ? 2 : article === "aml" ? 4 : 5;
for (let figure = 1; figure <= figureCount; figure++) {
  const base = resolve(assets, `${prefix}-${figure}`);
  const source = `${base}.png`;
  const { width, height } = await sharp(source).metadata();
  const { channels } = await sharp(source).ensureAlpha().stats();
  if (channels[3].min !== 0 || channels[3].max !== 255) {
    throw new Error(`Figure ${figure}: expected transparent background and visible artwork`);
  }
  const result = await sharp(source).webp({ lossless: true, effort: 6 })
    .toFile(`${base}.webp`);
  const original = await sharp(source).ensureAlpha().raw().toBuffer();
  const decoded = await sharp(`${base}.webp`).ensureAlpha().raw().toBuffer();
  // WebP may discard invisible RGB values, but alpha and visible pixels must match.
  for (let pixel = 0; pixel < original.length; pixel += 4) {
    if (original[pixel + 3] === 0 && decoded[pixel + 3] === 0) {
      original.fill(0, pixel, pixel + 3);
      decoded.fill(0, pixel, pixel + 3);
    }
  }
  if (!original.equals(decoded)) {
    throw new Error(`Figure ${figure}: lossless pixel verification failed`);
  }
  const src = `/capabilities/${prefix}-${figure}.webp`;
  const variants = [];
  for (const size of [640, 960, 1640]) {
    const output = `${base}-${size}.webp`;
    const buffer = await sharp(source).resize({ width: size, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 }).toBuffer();
    // Resizing UI screenshots can increase entropy and make lossless files larger.
    if (buffer.length < result.size * 0.9) {
      await writeFile(output, buffer);
      variants.push(`/capabilities/${prefix}-${figure}-${size}.webp ${size}w`);
    } else {
      await rm(output, { force: true });
    }
  }
  manifest[figure] = { src, width, height, srcSet: [...variants, `${src} ${width}w`].join(", ") };
  const pngBytes = (await stat(source)).size;
  console.log(`Figure ${figure}: ${width}x${height}, PNG ${pngBytes} bytes -> WebP ${result.size} bytes, pixels identical`);
}
await writeFile(resolve(assets, `../../src/data/${article}-images.json`), `${JSON.stringify(manifest, null, 2)}\n`);
