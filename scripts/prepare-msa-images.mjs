import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { prepareResponsiveImage } from "./lib/prepare-responsive-image.mjs";
const assets = resolve(import.meta.dirname, "../public/capabilities");
const article = process.argv[2] ?? "msa";
if (!["msa", "data-mapping", "aml", "mass-payout", "design-to-production", "unifying-headers", "website-redesign", "block-subtitles"].includes(article)) {
  throw new Error(`Unknown article image set: ${article}`);
}
const prefix = article === "msa" ? "msa-fig" : article;
const manifest = {};

// Keep original PNG masters and prepare theme-specific images where supplied.
const figureCount = article === "block-subtitles" ? 3 : ["design-to-production", "unifying-headers", "website-redesign"].includes(article) ? 2 : article === "aml" ? 4 : 5;
for (let figure = 1; figure <= figureCount; figure++) {
  const name = `${prefix}-${figure}`;
  const light = await prepareResponsiveImage(resolve(assets, `${name}.png`), `/capabilities/${name}`);
  const dark = await prepareResponsiveImage(resolve(assets, `${name}-dark.png`), `/capabilities/${name}-dark`);
  if (light.width !== dark.width || light.height !== dark.height) {
    throw new Error(`${name}: light and dark image dimensions must match`);
  }
  manifest[figure] = { ...light, dark };
}
await writeFile(resolve(assets, `../../src/data/${article}-images.json`), `${JSON.stringify(manifest, null, 2)}\n`);
