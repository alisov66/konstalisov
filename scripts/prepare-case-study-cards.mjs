import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve("next/package.json"))] }));
const root = resolve(import.meta.dirname, "../public/case-studies");
const manifest = {};

const studies = ["data-mapping", "msa-workspace", "mass-payout", "aml"];
for (const name of [...studies, ...studies.map(name => `${name}-hover`), "profile-photo"]) {
  const source = resolve(root, `${name}.png`);
  const { width, height } = await sharp(source).metadata();
  const result = await sharp(source).webp({ lossless: true, effort: 6 }).toFile(resolve(root, `${name}.webp`));
  const variants = [];
  for (const size of [640, 960, 1640]) {
    if (size >= width) continue;
    const buffer = await sharp(source).resize({ width: size }).webp({ lossless: true, effort: 6 }).toBuffer();
    if (buffer.length < result.size * 0.9) {
      await writeFile(resolve(root, `${name}-${size}.webp`), buffer);
      variants.push(`/case-studies/${name}-${size}.webp ${size}w`);
    }
  }
  const src = `/case-studies/${name}.webp`;
  manifest[name] = { src, width, height, srcSet: [...variants, `${src} ${width}w`].join(", ") };
  console.log(`${name}: ${width}x${height}, ${result.size} bytes`);
}
await writeFile(resolve(root, "../../src/data/case-study-images.json"), `${JSON.stringify(manifest, null, 2)}\n`);
