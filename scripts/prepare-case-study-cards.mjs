import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { prepareResponsiveImage } from "./lib/prepare-responsive-image.mjs";

const root = resolve(import.meta.dirname, "../public/case-studies");
const manifestPath = resolve(root, "../../src/data/case-study-images.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const studies = ["data-mapping", "msa-workspace", "mass-payout", "aml"];
for (const name of [...studies, ...studies.map(name => `${name}-hover`)]) {
  // Retain a retina-sized candidate even when its byte size exceeds the highly compressible master.
  const options = { requiredSizes: [1640] };
  const light = await prepareResponsiveImage(resolve(root, `${name}.png`), `/case-studies/${name}`, options);
  const dark = await prepareResponsiveImage(resolve(root, `${name}-dark.png`), `/case-studies/${name}-dark`, options);
  if (light.width !== dark.width || light.height !== dark.height) {
    throw new Error(`${name}: light and dark image dimensions must match`);
  }
  manifest[name] = { ...light, dark };
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
