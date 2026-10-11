import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { rm, stat, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", {
  paths: [dirname(require.resolve("next/package.json"))],
}));
const assets = resolve(import.meta.dirname, "../public/capabilities");
const manifest = {};

// Keep the 2x PNG exports as masters; encode all delivered sizes losslessly.
for (let figure = 1; figure <= 5; figure++) {
  const base = resolve(assets, `msa-fig-${figure}`);
  const source = `${base}.png`;
  const { width, height } = await sharp(source).metadata();
  const result = await sharp(source).webp({ lossless: true, effort: 6 })
    .toFile(`${base}.webp`);
  const original = await sharp(source).ensureAlpha().raw().toBuffer();
  const decoded = await sharp(`${base}.webp`).ensureAlpha().raw().toBuffer();
  if (!original.equals(decoded)) {
    throw new Error(`Figure ${figure}: lossless pixel verification failed`);
  }
  const src = `/capabilities/msa-fig-${figure}.webp`;
  const variants = [];
  for (const size of [640, 960, 1640]) {
    const output = `${base}-${size}.webp`;
    const buffer = await sharp(source).resize({ width: size, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 }).toBuffer();
    // Resizing UI screenshots can increase entropy and make lossless files larger.
    if (buffer.length < result.size * 0.9) {
      await writeFile(output, buffer);
      variants.push(`/capabilities/msa-fig-${figure}-${size}.webp ${size}w`);
    } else {
      await rm(output, { force: true });
    }
  }
  manifest[figure] = { src, width, height, srcSet: [...variants, `${src} ${width}w`].join(", ") };
  const pngBytes = (await stat(source)).size;
  console.log(`Figure ${figure}: ${width}x${height}, PNG ${pngBytes} bytes -> WebP ${result.size} bytes, pixels identical`);
}
await writeFile(resolve(assets, "../../src/data/msa-images.json"), `${JSON.stringify(manifest, null, 2)}\n`);
