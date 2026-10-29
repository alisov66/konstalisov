import type { CSSProperties } from "react";
import artworks from "@/data/workflow-artwork.json";
import type { WorkflowStep } from "@/data/workflow";
import { effects } from "@/styles";

export default function WorkflowArtwork({ artwork }: { artwork: NonNullable<WorkflowStep["artwork"]> }) {
  const texture = effects.texture.m1;
  const frequency = [texture.size.x, texture.size.y]
    .map((size) => Math.fround(1 / Math.fround(size)))
    .join(" ");
  const source = artworks[artwork];
  const values = {
    __TEXTURE_FREQUENCY__: frequency,
    __TEXTURE_SCALE__: String(texture.radius * 2),
    __TEXTURE_OUTPUT__: texture.clipToShape ? "clippedImage" : "displacedImage",
  };
  let svg = source.svg;
  for (const [placeholder, value] of Object.entries(values)) svg = svg.replaceAll(placeholder, value);
  const offsets = {
    "--workflow-artwork-offset-x": `${-source.nativeSize.width / 2}px`,
    "--workflow-artwork-offset-y": `${-source.nativeSize.height / 2}px`,
  } as CSSProperties;

  return (
    <li className="workflow-artwork" role="presentation" aria-hidden="true">
      <svg className="workflow-artwork__canvas" width="100%" height="100%" overflow="visible">
        {/* Filter outside the scaled geometry keeps texture size constant. */}
        <g filter={`url(#${source.filterId})`}>
          {/* Trusted Figma SVG exports, with no user-supplied markup. */}
          <g className="workflow-artwork__image" style={offsets} dangerouslySetInnerHTML={{ __html: svg }} />
        </g>
      </svg>
    </li>
  );
}
