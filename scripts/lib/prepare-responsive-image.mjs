import { createRequire } from "node:module";
import { dirname, parse, resolve } from "node:path";
import { rm, stat, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", {
  paths: [dirname(require.resolve("next/package.json"))],
}));

export async function prepareResponsiveImage(source, publicPath, { requiredSizes = [] } = {}) {
  const { dir, name } = parse(source);
  const base = resolve(dir, name);
  const { width, height } = await sharp(source).metadata();
  const { channels } = await sharp(source).ensureAlpha().stats();
  if (channels[3].min !== 0 || channels[3].max !== 255) {
    throw new Error(`${source}: expected transparency and visible artwork`);
  }

  const result = await sharp(source).webp({ lossless: true, effort: 6 }).toFile(`${base}.webp`);
  const original = await sharp(source).ensureAlpha().raw().toBuffer();
  const decoded = await sharp(`${base}.webp`).ensureAlpha().raw().toBuffer();
  // Fully transparent RGB values may be discarded; visible pixels and alpha must match.
  for (let pixel = 0; pixel < original.length; pixel += 4) {
    if (original[pixel + 3] === 0 && decoded[pixel + 3] === 0) {
      original.fill(0, pixel, pixel + 3);
      decoded.fill(0, pixel, pixel + 3);
    }
  }
  if (!original.equals(decoded)) throw new Error(`${source}: lossless pixel verification failed`);

  const variants = [];
  for (const size of [640, 960, 1640]) {
    const output = `${base}-${size}.webp`;
    if (size < width) {
      const buffer = await sharp(source).resize({ width: size })
        .webp({ lossless: true, effort: 6 }).toBuffer();
      // Resizing UI artwork can increase entropy; only keep meaningfully smaller files.
      if (buffer.length < result.size * 0.9 || requiredSizes.includes(size)) {
        await writeFile(output, buffer);
        variants.push(`${publicPath}-${size}.webp ${size}w`);
        continue;
      }
    }
    await rm(output, { force: true });
  }

  const src = `${publicPath}.webp`;
  console.log(`${name}: ${width}x${height}, PNG ${(await stat(source)).size} -> WebP ${result.size} bytes, pixels identical`);
  return { src, width, height, srcSet: [...variants, `${src} ${width}w`].join(", ") };
}
