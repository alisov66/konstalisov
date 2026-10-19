"use client";

import { useEffect, useId, useRef } from "react";
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
  shapeTime: 65,
  speedIdleTime: 32,
  speedDecayTime: 90,
  speedForMaxStretch: 1.5,
  minFollowScale: 0.65,
  maxFollowStretch: 1.3,
  maxStretch: 1.65,
  buttonEnterTime: 300,
  buttonExitTime: 300,
};

// Resolve CSS ease-in (0.42, 0, 1, 1); ease-out is its time-reversed curve.
function easeIn(progress: number) {
  if (progress <= 0 || progress >= 1) return progress;
  let low = 0;
  let high = 1;
  for (let step = 0; step < 16; step++) {
    const t = (low + high) / 2;
    const x = 1.26 * (1 - t) ** 2 * t + 3 * (1 - t) * t ** 2 + t ** 3;
    if (x < progress) low = t;
    else high = t;
  }
  const t = (low + high) / 2;
  return 3 * t ** 2 - 2 * t ** 3;
}

// The first and last rows are clipped in the Figma grid; its final row is inset.
const prototypeDots = Array.from({ length: scene.rows }, (_, row) => {
  const inset = row === scene.rows - 1 ? 7 : 0;
  return Array.from({ length: scene.columns - inset * 2 }, (_, column) => ({
    x: scene.grid.x + (column + inset) * scene.spacing + 4,
    y: scene.grid.y - 2 + row * scene.spacing,
  }));
}).flat();

export default function InteractiveDotGrid({ variant = "playground" }: { variant?: "playground" | "hero" }) {
  const instructionsId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const base = baseRef.current;
    const accent = accentRef.current;
    if (!root || !base || !accent) return;
    const eventTarget = variant === "hero" ? root.parentElement! : root;
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
    let height = 0;
    let sceneWidth = scene.size;
    let sceneHeight = scene.size;
    let grid = { ...scene.grid };
    let dots = prototypeDots;
    let restColor = "";
    let hoverColor = "";
    let hoveredButton: HTMLElement | null = null;
    let circleScale = 1;
    let followScale = 1;
    const shape = { stretch: 1, angle: 0 };
    const pointerVelocity = { speed: 0, angle: 0, time: 0 };
    let previousPointer: { x: number; y: number; time: number } | null = null;
    let buttonMotion: {
      x: number;
      y: number;
      scale: number;
      targetScale: number;
      start: number;
      duration: number;
      stretch: number;
      angle: number;
    } | null = null;
    const maskSize = scene.circleDiameter + scene.maskBlur * 2;
    const radius = maskSize / 2;
    const maskImage = new Image();
    const maskStamp = document.createElement("canvas");
    const maskContext = maskStamp.getContext("2d");

    function prepareMask() {
      if (!maskContext || !maskImage.complete || !maskImage.naturalWidth) return;
      maskStamp.width = maskStamp.height = Math.round(maskSize * Math.min(window.devicePixelRatio, 2));
      maskContext.drawImage(maskImage, 0, 0, maskStamp.width, maskStamp.height);
      requestDraw();
    }

    maskImage.onload = prepareMask;
    maskImage.src = "/interactive-grid/hover-mask.svg";

    function draw(time: number) {
      frame = 0;
      if (!width) return;
      let following = false;
      if (reducedMotion.matches || !followPointer) {
        buttonMotion = null;
        circleScale = hoveredButton ? 0 : 1;
        followScale = 1;
        shape.stretch = 1;
        shape.angle = 0;
        pointerVelocity.speed = 0;
        previousPointer = null;
      } else if (active && buttonMotion?.targetScale === 0) {
        const progress = Math.min(1, Math.max(0, (time - buttonMotion.start) / buttonMotion.duration));
        const ease = 1 - easeIn(1 - progress);
        circle.x = buttonMotion.x + (point.x - buttonMotion.x) * ease;
        circle.y = buttonMotion.y + (point.y - buttonMotion.y) * ease;
        circleScale = buttonMotion.scale + (buttonMotion.targetScale - buttonMotion.scale) * ease;
        const dx = point.x - buttonMotion.x;
        const dy = point.y - buttonMotion.y;
        const travel = Math.min(1, Math.hypot(dx, dy) / (scene.circleDiameter / 2));
        const wave = Math.sin(progress * Math.PI * 2);
        // Stretch along travel, then squash on arrival, while preserving the ellipse's area.
        shape.stretch = buttonMotion.stretch + (1 - buttonMotion.stretch) * ease
          + wave * (wave > 0 ? 0.65 : 0.3) * travel;
        const direction = Math.atan2(dy, dx);
        const turn = Math.atan2(Math.sin(direction - buttonMotion.angle), Math.cos(direction - buttonMotion.angle));
        shape.angle = Math.abs(buttonMotion.stretch - 1) < 0.001
          ? direction : buttonMotion.angle + turn * ease;
        following = progress < 1;
        if (!following) {
          circleScale = buttonMotion.targetScale;
          shape.stretch = 1;
          buttonMotion = null;
        }
      } else if (active && followPointer && !reducedMotion.matches && !hoveredButton) {
        // Time-based easing gives the same trailing motion at different refresh rates.
        const elapsed = Math.max(0, Math.min(64, time - previousFrameTime));
        const progress = 1 - Math.exp(-elapsed / scene.followTime);
        circle.x += (point.x - circle.x) * progress;
        circle.y += (point.y - circle.y) * progress;
        const speed = pointerVelocity.speed
          * Math.exp(-Math.max(0, time - pointerVelocity.time - scene.speedIdleTime) / scene.speedDecayTime);
        const speedRatio = Math.min(1, speed / scene.speedForMaxStretch);
        const targetStretch = 1 + (scene.maxFollowStretch - 1) * speedRatio;
        const targetScale = 1 - (1 - scene.minFollowScale) * speedRatio;
        const shapeProgress = 1 - Math.exp(-elapsed / scene.shapeTime);
        shape.stretch += (targetStretch - shape.stretch) * shapeProgress;
        followScale += (targetScale - followScale) * shapeProgress;
        if (buttonMotion?.targetScale === 1) {
          // Only reveal the highlight; its position and speed response already use normal following.
          const reveal = Math.min(1, Math.max(0, (time - buttonMotion.start) / buttonMotion.duration));
          const ease = 1 - easeIn(1 - reveal);
          circleScale = buttonMotion.scale + (followScale - buttonMotion.scale) * ease;
          if (reveal === 1) buttonMotion = null;
        } else {
          circleScale = followScale;
        }
        // An ellipse has the same axis in both directions, avoiding a spin on reversal.
        const turn = Math.atan2(
          Math.sin(2 * (pointerVelocity.angle - shape.angle)),
          Math.cos(2 * (pointerVelocity.angle - shape.angle)),
        ) / 2;
        shape.angle += turn * shapeProgress;
        const deforming = Math.abs(shape.stretch - 1) > 0.001 || Math.abs(circleScale - 1) > 0.001;
        if (!deforming) {
          shape.stretch = 1;
          circleScale = 1;
          followScale = 1;
        }
        following = Math.hypot(point.x - circle.x, point.y - circle.y) > 0.1 || deforming || buttonMotion !== null;
      }
      shape.stretch = Math.max(1 / scene.maxStretch, Math.min(scene.maxStretch, shape.stretch));
      if (!following) Object.assign(circle, point);
      previousFrameTime = time;
      const scale = base!.width / sceneWidth;
      const visibleRadius = radius * circleScale;
      root!.dataset.active = String(active);
      const shapeCosine = Math.cos(shape.angle);
      const shapeSine = Math.sin(shape.angle);

      for (const context of contexts) {
        context.setTransform(scale, 0, 0, base!.height / sceneHeight, 0, 0);
        context.clearRect(0, 0, sceneWidth, sceneHeight);
        context.save();
        context.beginPath();
        context.rect(grid.x, grid.y, grid.width, grid.height);
        context.clip();
        context.beginPath();
      }

      for (const dot of dots) {
        const dx = dot.x - circle.x;
        const dy = dot.y - circle.y;
        const distance = Math.hypot(
          (dx * shapeCosine + dy * shapeSine) / shape.stretch,
          (-dx * shapeSine + dy * shapeCosine) * shape.stretch,
        );
        const proximity = active && !reducedMotion.matches && visibleRadius > 0
          ? Math.max(0, 1 - distance / visibleRadius) : 0;
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
        context.fillStyle = index === 0 ? restColor : hoverColor;
        context.fill();
        context.restore();
      }
      // Transform the original soft mask, leaving the grid itself unrotated.
      if (active && visibleRadius > 0 && maskStamp.width && maskImage.complete) {
        accentContext!.save();
        accentContext!.globalCompositeOperation = "destination-in";
        accentContext!.globalAlpha = Math.min(1, circleScale);
        accentContext!.translate(circle.x, circle.y);
        accentContext!.rotate(shape.angle);
        accentContext!.scale(circleScale * shape.stretch, circleScale / shape.stretch);
        accentContext!.drawImage(maskStamp, -radius, -radius, maskSize, maskSize);
        accentContext!.restore();
      } else {
        accentContext!.clearRect(0, 0, sceneWidth, sceneHeight);
      }
      if (following) requestDraw();
    }

    function requestDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function resize() {
      const bounds = root!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (variant === "hero") {
        sceneWidth = width;
        sceneHeight = height;
        grid = { x: 0, y: 0, width, height };
        // Extend the pattern at its original spacing instead of stretching the square prototype.
        dots = Array.from({ length: Math.ceil(height / scene.spacing) }, (_, row) =>
          Array.from({ length: Math.ceil(width / scene.spacing) }, (_, column) => ({
            x: column * scene.spacing + scene.spacing / 2,
            y: row * scene.spacing + scene.spacing / 2,
          })),
        ).flat();
      }
      for (const canvas of [base!, accent!]) {
        canvas.width = Math.round(width * window.devicePixelRatio);
        canvas.height = Math.round(height * window.devicePixelRatio);
      }
      const style = getComputedStyle(root!);
      restColor = style.getPropertyValue("--dot-grid-rest").trim();
      hoverColor = style.getPropertyValue("--dot-grid-hover").trim();
      prepareMask();
      reset();
    }

    function updatePointer(event: PointerEvent) {
      const wasActive = active;
      const bounds = root!.getBoundingClientRect();
      point.x = (event.clientX - bounds.left) * sceneWidth / bounds.width;
      point.y = (event.clientY - bounds.top) * sceneHeight / bounds.height;
      active = point.x >= grid.x && point.x <= grid.x + grid.width
        && point.y >= grid.y && point.y <= grid.y + grid.height;
      followPointer = event.pointerType === "mouse";
      if (active && !wasActive && followPointer && !reducedMotion.matches) {
        const offset = scene.circleDiameter / 2;
        const entry = [
          { distance: point.x - grid.x, x: -offset, y: 0 },
          { distance: grid.x + grid.width - point.x, x: offset, y: 0 },
          { distance: point.y - grid.y, x: 0, y: -offset },
          { distance: grid.y + grid.height - point.y, x: 0, y: offset },
        ].sort((a, b) => a.distance - b.distance)[0];
        circle.x = point.x + entry.x;
        circle.y = point.y + entry.y;
      }
      const button = variant === "hero" && followPointer && event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-dot-grid-absorb] a, [data-dot-grid-absorb] button")
        : null;
      const now = performance.now();
      if (followPointer && wasActive && !button && button === hoveredButton && previousPointer) {
        const elapsed = Math.max(1, Math.min(64, now - previousPointer.time));
        const dx = point.x - previousPointer.x;
        const dy = point.y - previousPointer.y;
        // Measure in CSS pixels per millisecond so device density and grid scaling do not affect the response.
        const speed = Math.hypot(dx, dy) * width / sceneWidth / elapsed;
        pointerVelocity.speed += (speed - pointerVelocity.speed) * (1 - Math.exp(-elapsed / scene.shapeTime));
        if (speed > 0.01) pointerVelocity.angle = Math.atan2(dy, dx);
      } else {
        pointerVelocity.speed = 0;
      }
      pointerVelocity.time = now;
      previousPointer = followPointer ? { x: point.x, y: point.y, time: now } : null;
      if (button !== hoveredButton) {
        hoveredButton = button;
        buttonMotion = {
          x: circle.x,
          y: circle.y,
          scale: circleScale,
          targetScale: button ? 0 : 1,
          start: performance.now(),
          duration: button ? scene.buttonEnterTime : scene.buttonExitTime,
          stretch: shape.stretch,
          angle: shape.angle,
        };
      }
      if (button) {
        const buttonBounds = button.getBoundingClientRect();
        point.x = (buttonBounds.left + buttonBounds.width / 2 - bounds.left) * sceneWidth / bounds.width;
        point.y = (buttonBounds.top + buttonBounds.height / 2 - bounds.top) * sceneHeight / bounds.height;
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
      hoveredButton = null;
      buttonMotion = null;
      circleScale = 1;
      followScale = 1;
      shape.stretch = 1;
      shape.angle = 0;
      pointerVelocity.speed = 0;
      previousPointer = null;
      requestDraw();
    }

    function focus() {
      if (!root!.matches(":focus-visible")) return;
      point.x = sceneWidth / 2;
      point.y = sceneHeight / 2;
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
      point.x = Math.min(grid.x + grid.width, Math.max(grid.x, point.x + direction[0] * scene.spacing));
      point.y = Math.min(grid.y + grid.height, Math.max(grid.y, point.y + direction[1] * scene.spacing));
      active = true;
      requestDraw();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    eventTarget.addEventListener("pointerenter", enter);
    eventTarget.addEventListener("pointermove", updatePointer);
    eventTarget.addEventListener("pointerdown", updatePointer);
    eventTarget.addEventListener("pointerup", release);
    eventTarget.addEventListener("pointercancel", reset);
    eventTarget.addEventListener("pointerleave", reset);
    root.addEventListener("focus", focus);
    root.addEventListener("blur", reset);
    root.addEventListener("keydown", keyDown);
    window.addEventListener("blur", reset);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", reset, { passive: true });
    reducedMotion.addEventListener("change", requestDraw);
    resize();

    return () => {
      maskImage.onload = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      eventTarget.removeEventListener("pointerenter", enter);
      eventTarget.removeEventListener("pointermove", updatePointer);
      eventTarget.removeEventListener("pointerdown", updatePointer);
      eventTarget.removeEventListener("pointerup", release);
      eventTarget.removeEventListener("pointercancel", reset);
      eventTarget.removeEventListener("pointerleave", reset);
      root.removeEventListener("focus", focus);
      root.removeEventListener("blur", reset);
      root.removeEventListener("keydown", keyDown);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", reset);
      reducedMotion.removeEventListener("change", requestDraw);
    };
  }, [variant]);

  return (
    <div className={`interactive-dot-grid interactive-dot-grid--${variant}`} ref={rootRef} role={variant === "hero" ? undefined : "group"} tabIndex={variant === "hero" ? undefined : 0} aria-hidden={variant === "hero" ? true : undefined} aria-label={variant === "hero" ? undefined : "Interactive dot grid"} aria-describedby={variant === "hero" ? undefined : instructionsId}>
      {variant === "playground" && <span id={instructionsId} className="sr-only">Move the pointer across the grid, or use the arrow keys to move the highlight. Press Escape to clear it.</span>}
      <canvas ref={baseRef} aria-hidden="true" />
      <canvas className="interactive-dot-grid__accent" ref={accentRef} aria-hidden="true" />
    </div>
  );
}
