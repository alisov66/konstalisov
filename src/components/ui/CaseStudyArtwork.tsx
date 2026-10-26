"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { TexturePreset, TextureTransition } from "@/styles/effects";

type MorphTarget = { key: string; attribute: string; from: string; to: string };
export type CardArtwork = {
  svg: string;
  targets: readonly MorphTarget[];
  textureBounds: { x: number; y: number; width: number; height: number };
};

function textureValues(preset: TexturePreset) {
  // Match Figma's native SVG export: reciprocal size and twice the radius.
  return {
    frequency: `${Math.fround(1 / Math.fround(preset.size.x))} ${Math.fround(1 / Math.fround(preset.size.y))}`,
    scale: String(preset.radius * 2),
    output: preset.clipToShape ? "clippedImage" : "displacedImage",
  };
}

// CSS ease-out: cubic-bezier(0, 0, .58, 1), shared by the Figma card transitions.
function easeOut(progress: number) {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 16; i++) {
    const t = (low + high) / 2;
    const x = 1.74 * t * t - .74 * t * t * t;
    if (x < progress) low = t;
    else high = t;
  }
  const t = (low + high) / 2;
  return t * t * (3 - 2 * t);
}

function interpolate(target: MorphTarget, progress: number) {
  if (target.attribute === "fill") {
    const channels = [1, 3, 5].map((offset) => {
      const from = parseInt(target.from.slice(offset, offset + 2), 16);
      const to = parseInt(target.to.slice(offset, offset + 2), 16);
      return Math.round(from + (to - from) * progress);
    });
    return `rgb(${channels.join(", ")})`;
  }
  const from = target.from.split(" ").map(Number);
  return target.to.split(" ").map((value, index) => from[index] + (Number(value) - from[index]) * progress).join(" ");
}

export default function CaseStudyArtwork({ artwork, texture }: { artwork: CardArtwork; texture: TextureTransition }) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const svg = useMemo(() => {
    const initial = textureValues(texture.default);
    const bounds = artwork.textureBounds;
    // Reserve room for both states so a larger radius is not clipped mid-morph.
    const padding = Math.max(texture.default.radius, texture.hover.radius);
    const values = {
      __ARTWORK_ID__: `artwork-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`,
      __TEXTURE_FREQUENCY__: initial.frequency,
      __TEXTURE_SCALE__: initial.scale,
      __TEXTURE_OUTPUT__: initial.output,
      __TEXTURE_X__: String(bounds.x - padding),
      __TEXTURE_Y__: String(bounds.y - padding),
      __TEXTURE_WIDTH__: String(bounds.width + padding * 2),
      __TEXTURE_HEIGHT__: String(bounds.height + padding * 2),
    };
    let result = artwork.svg;
    for (const [placeholder, value] of Object.entries(values)) result = result.replaceAll(placeholder, value);
    return result;
  }, [artwork, texture, id]);

  useEffect(() => {
    const element = root.current;
    const card = element?.closest("a");
    if (!element || !card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover)");
    const targets = artwork.targets.map((target) => ({ ...target, node: element.querySelector(`[data-morph="${target.key}"]`) }));
    const from = textureValues(texture.default);
    const to = textureValues(texture.hover);
    targets.push(
      { key: "texture-frequency", attribute: "baseFrequency", from: from.frequency, to: to.frequency, node: element.querySelector('[data-texture="frequency"]') },
      { key: "texture-radius", attribute: "scale", from: from.scale, to: to.scale, node: element.querySelector('[data-texture="displacement"]') },
    );
    const output = element.querySelector('[data-texture="output"]');
    let frame = 0;
    let progress = 0;
    let destination = 0;
    let start = 0;
    let startProgress = 0;

    const render = (value: number) => {
      progress = value;
      for (const target of targets) target.node?.setAttribute(target.attribute, interpolate(target, value));
      output?.setAttribute("in", value < .5 ? from.output : to.output);
    };
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      render(startProgress + (destination - startProgress) * easeOut(elapsed));
      frame = elapsed < 1 ? requestAnimationFrame(tick) : 0;
      if (!frame) render(destination);
    };
    const durationValue = getComputedStyle(card).getPropertyValue("--button-transition-duration").trim();
    const duration = parseFloat(durationValue) * (durationValue.endsWith("ms") ? 1 : 1000) || 150;
    const animate = (next: number) => {
      cancelAnimationFrame(frame);
      destination = next;
      if (reducedMotion.matches) {
        frame = 0;
        render(next);
        return;
      }
      startProgress = progress;
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const enter = () => { if (canHover.matches) animate(1); };
    const leave = () => animate(0);
    const motionChange = () => { if (reducedMotion.matches) { cancelAnimationFrame(frame); frame = 0; render(destination); } };
    const hoverChange = () => { if (!canHover.matches) leave(); };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointercancel", leave);
    reducedMotion.addEventListener("change", motionChange);
    canHover.addEventListener("change", hoverChange);
    if (canHover.matches && card.matches(":hover")) enter();
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("pointercancel", leave);
      reducedMotion.removeEventListener("change", motionChange);
      canHover.removeEventListener("change", hoverChange);
    };
  }, [artwork, texture]);

  // Only trusted, locally exported Figma SVGs enter this component, never user HTML.
  return <div ref={root} className="case-study-artwork" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
