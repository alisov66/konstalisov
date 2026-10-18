"use client";

import { useEffect, useRef } from "react";
import "./InteractiveDotGrid.css";

const scene = {
  size: 717,
  grid: { x: 59, y: 105, width: 600, height: 508 },
  columns: 38,
  rows: 33,
  spacing: 16,
  dotSize: 4,
  maxDotSize: 8,
  maxRotation: Math.PI / 4,
  circleDiameter: 200,
  maskBlur: 80,
  followTime: 120,
};

// The first and last rows are clipped in the Figma grid; its final row is inset.
const dots = Array.from({ length: scene.rows }, (_, row) => {
  const inset = row === scene.rows - 1 ? 7 : 0;
  return Array.from({ length: scene.columns - inset * 2 }, (_, column) => ({
    x: scene.grid.x + (column + inset) * scene.spacing + 4,
    y: scene.grid.y - 2 + row * scene.spacing,
  }));
}).flat();

export default function InteractiveDotGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const base = baseRef.current;
    const accent = accentRef.current;
    if (!root || !base || !accent) return;
    const baseContext = base.getContext("2d");
    const accentContext = accent.getContext("2d");
    if (!baseContext || !accentContext) return;

    const contexts = [baseContext, accentContext];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const point = { x: scene.size / 2, y: scene.size / 2 };
    const circle = { ...point };
    let active = false;
    let followPointer = false;
    let previousFrameTime = 0;
    let frame = 0;
    let width = 0;
    let gray = "";
    let orange = "";
    const maskSize = scene.circleDiameter + scene.maskBlur * 2;
    const radius = maskSize / 2;

    function draw(time: number) {
      frame = 0;
      if (!width) return;
      let following = false;
      if (active && followPointer && !reducedMotion.matches) {
        // Time-based easing gives the same trailing motion at different refresh rates.
        const elapsed = Math.max(0, Math.min(64, time - previousFrameTime));
        const progress = 1 - Math.exp(-elapsed / scene.followTime);
        circle.x += (point.x - circle.x) * progress;
        circle.y += (point.y - circle.y) * progress;
        following = Math.hypot(point.x - circle.x, point.y - circle.y) > 0.1;
      }
      if (!following) Object.assign(circle, point);
      previousFrameTime = time;
      const scale = base!.width / scene.size;
      const displayScale = width / scene.size;
      root!.dataset.active = String(active);
      accent!.style.maskSize = `${maskSize * displayScale}px ${maskSize * displayScale}px`;
      accent!.style.maskPosition = `${(circle.x - radius) * displayScale}px ${(circle.y - radius) * displayScale}px`;

      for (const context of contexts) {
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.clearRect(0, 0, scene.size, scene.size);
        context.save();
        context.beginPath();
        context.rect(scene.grid.x, scene.grid.y, scene.grid.width, scene.grid.height);
        context.clip();
        context.beginPath();
      }

      for (const dot of dots) {
        const distance = Math.hypot(dot.x - circle.x, dot.y - circle.y);
        const proximity = active && !reducedMotion.matches ? Math.max(0, 1 - distance / radius) : 0;
        const influence = proximity * proximity * (3 - 2 * proximity);
        const size = scene.dotSize + (scene.maxDotSize - scene.dotSize) * influence;
        const half = size / 2;

        if (!influence) {
          for (const context of contexts) context.rect(dot.x - half, dot.y - half, size, size);
          continue;
        }

        const angle = scene.maxRotation * influence;
        const cosine = Math.cos(angle) * half;
        const sine = Math.sin(angle) * half;
        for (const context of contexts) {
          context.moveTo(dot.x - cosine + sine, dot.y - sine - cosine);
          context.lineTo(dot.x + cosine + sine, dot.y + sine - cosine);
          context.lineTo(dot.x + cosine - sine, dot.y + sine + cosine);
          context.lineTo(dot.x - cosine - sine, dot.y - sine + cosine);
          context.closePath();
        }
      }

      for (const [index, context] of contexts.entries()) {
        context.fillStyle = index === 0 ? gray : orange;
        context.fill();
        context.restore();
      }
      if (following) requestDraw();
    }

    function requestDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function resize() {
      width = root!.getBoundingClientRect().width;
      const pixels = Math.round(width * window.devicePixelRatio);
      for (const canvas of [base!, accent!]) {
        canvas.width = pixels;
        canvas.height = pixels;
      }
      const style = getComputedStyle(root!);
      gray = style.getPropertyValue("--border-tertiary").trim();
      orange = style.getPropertyValue("--border-focus").trim();
      reset();
    }

    function updatePointer(event: PointerEvent) {
      const wasActive = active;
      const bounds = root!.getBoundingClientRect();
      point.x = (event.clientX - bounds.left) * scene.size / bounds.width;
      point.y = (event.clientY - bounds.top) * scene.size / bounds.height;
      active = point.x >= scene.grid.x && point.x <= scene.grid.x + scene.grid.width
        && point.y >= scene.grid.y && point.y <= scene.grid.y + scene.grid.height;
      followPointer = event.pointerType === "mouse";
      if (active && !wasActive && followPointer && !reducedMotion.matches) {
        const offset = scene.circleDiameter / 2;
        const entry = [
          { distance: point.x - scene.grid.x, x: -offset, y: 0 },
          { distance: scene.grid.x + scene.grid.width - point.x, x: offset, y: 0 },
          { distance: point.y - scene.grid.y, x: 0, y: -offset },
          { distance: scene.grid.y + scene.grid.height - point.y, x: 0, y: offset },
        ].sort((a, b) => a.distance - b.distance)[0];
        circle.x = point.x + entry.x;
        circle.y = point.y + entry.y;
      }
      if (!frame) previousFrameTime = performance.now();
      requestDraw();
    }

    function enter(event: PointerEvent) {
      if (event.pointerType !== "touch") updatePointer(event);
    }

    function release(event: PointerEvent) {
      if (event.pointerType === "touch") reset();
    }

    function reset() {
      active = false;
      requestDraw();
    }

    function focus() {
      if (!root!.matches(":focus-visible")) return;
      point.x = scene.size / 2;
      point.y = scene.size / 2;
      followPointer = false;
      active = true;
      requestDraw();
    }

    function keyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        reset();
        return;
      }
      const directions: Record<string, [number, number]> = {
        ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1],
      };
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      followPointer = false;
      point.x = Math.min(scene.grid.x + scene.grid.width, Math.max(scene.grid.x, point.x + direction[0] * scene.spacing));
      point.y = Math.min(scene.grid.y + scene.grid.height, Math.max(scene.grid.y, point.y + direction[1] * scene.spacing));
      active = true;
      requestDraw();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointermove", updatePointer);
    root.addEventListener("pointerdown", updatePointer);
    root.addEventListener("pointerup", release);
    root.addEventListener("pointercancel", reset);
    root.addEventListener("pointerleave", reset);
    root.addEventListener("focus", focus);
    root.addEventListener("blur", reset);
    root.addEventListener("keydown", keyDown);
    window.addEventListener("blur", reset);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", reset, { passive: true });
    reducedMotion.addEventListener("change", requestDraw);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", updatePointer);
      root.removeEventListener("pointerdown", updatePointer);
      root.removeEventListener("pointerup", release);
      root.removeEventListener("pointercancel", reset);
      root.removeEventListener("pointerleave", reset);
      root.removeEventListener("focus", focus);
      root.removeEventListener("blur", reset);
      root.removeEventListener("keydown", keyDown);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", reset);
      reducedMotion.removeEventListener("change", requestDraw);
    };
  }, []);

  return (
    <div className="interactive-dot-grid" ref={rootRef} role="group" tabIndex={0} aria-label="Interactive dot grid" aria-describedby="dot-grid-instructions">
      <span id="dot-grid-instructions" className="sr-only">Move the pointer across the grid, or use the arrow keys to move the highlight. Press Escape to clear it.</span>
      <canvas ref={baseRef} aria-hidden="true" />
      <canvas className="interactive-dot-grid__accent" ref={accentRef} aria-hidden="true" />
    </div>
  );
}
