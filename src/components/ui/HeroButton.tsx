"use client";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PointerEventHandler,
  ReactNode,
} from "react";
import { useEffect, useRef, useState } from "react";

import { tokens } from "@/styles/tokens";

type HeroButtonStyle = CSSProperties &
  Record<`--hero-button-${string}`, string | number> &
  Record<`--navi-${string}`, string | number>;

const blobVariants = [
  {
    radiusA: "47% 53% 41% 59% / 56% 38% 62% 44%",
    radiusB: "62% 38% 59% 41% / 44% 58% 42% 56%",
    radiusC: "39% 61% 57% 43% / 48% 62% 38% 52%",
    radiusD: "56% 44% 38% 62% / 61% 36% 64% 39%",
    offsetAX: "0px",
    offsetAY: "0px",
    offsetBX: "12px",
    offsetBY: "-7px",
    offsetCX: "-10px",
    offsetCY: "8px",
    offsetDX: "5px",
    offsetDY: "12px",
    rotateA: "18deg",
    rotateB: "-22deg",
    rotateC: "31deg",
    rotateD: "-13deg",
  },
  {
    radiusA: "58% 42% 63% 37% / 39% 61% 45% 55%",
    radiusB: "43% 57% 38% 62% / 60% 40% 57% 43%",
    radiusC: "64% 36% 48% 52% / 45% 55% 63% 37%",
    radiusD: "41% 59% 60% 40% / 58% 42% 39% 61%",
    offsetAX: "0px",
    offsetAY: "0px",
    offsetBX: "-11px",
    offsetBY: "8px",
    offsetCX: "11px",
    offsetCY: "7px",
    offsetDX: "-4px",
    offsetDY: "-12px",
    rotateA: "-14deg",
    rotateB: "28deg",
    rotateC: "-32deg",
    rotateD: "12deg",
  },
  {
    radiusA: "39% 61% 55% 45% / 52% 43% 57% 48%",
    radiusB: "56% 44% 46% 54% / 37% 59% 41% 63%",
    radiusC: "45% 55% 65% 35% / 59% 41% 53% 47%",
    radiusD: "62% 38% 42% 58% / 40% 60% 36% 64%",
    offsetAX: "0px",
    offsetAY: "0px",
    offsetBX: "13px",
    offsetBY: "6px",
    offsetCX: "-8px",
    offsetCY: "-10px",
    offsetDX: "-12px",
    offsetDY: "3px",
    rotateA: "24deg",
    rotateB: "-16deg",
    rotateC: "9deg",
    rotateD: "-28deg",
  },
  {
    radiusA: "61% 39% 44% 56% / 46% 54% 36% 64%",
    radiusB: "42% 58% 61% 39% / 58% 42% 63% 37%",
    radiusC: "37% 63% 52% 48% / 63% 37% 55% 45%",
    radiusD: "59% 41% 36% 64% / 44% 56% 62% 38%",
    offsetAX: "0px",
    offsetAY: "0px",
    offsetBX: "-13px",
    offsetBY: "-6px",
    offsetCX: "8px",
    offsetCY: "10px",
    offsetDX: "12px",
    offsetDY: "-3px",
    rotateA: "-26deg",
    rotateB: "19deg",
    rotateC: "-9deg",
    rotateD: "27deg",
  },
];

export interface HeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
  size?: "L" | "M" | "S";
}

export default function HeroButton({
  children,
  className,
  selected = false,
  size = "L",
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  style,
  type = "button",
  ...props
}: HeroButtonProps) {
  const [hoverState, setHoverState] = useState<"idle" | "fill" | "drain">(
    selected ? "fill" : "idle",
  );
  const [hoverOrigin, setHoverOrigin] = useState({ x: "50%", y: "50%" });
  const [blobVariantIndex, setBlobVariantIndex] = useState(0);
  const blobVariant = blobVariants[blobVariantIndex];
  const drainTimeoutRef = useRef<number | null>(null);
  const typography =
    size === "S"
      ? tokens.typography.button.sSemibold
      : size === "M"
        ? tokens.typography.button.mediumSemibold
        : tokens.typography.button.large;

  const clearDrainTimeout = () => {
    if (drainTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(drainTimeoutRef.current);
    drainTimeoutRef.current = null;
  };

  useEffect(() => clearDrainTimeout, []);

  const updateHoverOrigin = (
    event: Parameters<PointerEventHandler<HTMLButtonElement>>[0],
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setHoverOrigin({
      x: `${x}px`,
      y: `${y}px`,
    });
  };

  const handlePointerEnter: PointerEventHandler<HTMLButtonElement> = (event) => {
    clearDrainTimeout();
    updateHoverOrigin(event);
    setBlobVariantIndex((currentIndex) => {
      const nextIndex = Math.floor(Math.random() * blobVariants.length);

      return nextIndex === currentIndex
        ? (nextIndex + 1) % blobVariants.length
        : nextIndex;
    });
    setHoverState("fill");
    onPointerEnter?.(event);
  };

  const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (event) => {
    clearDrainTimeout();
    updateHoverOrigin(event);
    setHoverState("drain");
    drainTimeoutRef.current = window.setTimeout(() => {
      drainTimeoutRef.current = null;
      setHoverState("idle");
    }, 300);
    onPointerLeave?.(event);
  };

  const heroButtonStyle = {
    "--hero-button-bg": tokens.colors.button.hero.default,
    "--hero-button-hover-bg": tokens.colors.button.hero.hover,
    "--hero-button-text": tokens.colors.button.hero.text,
    "--hero-button-radius": tokens.radius.pill,
    "--hero-button-padding-x":
      size === "S"
        ? tokens.spacing.base[3]
        : size === "M"
          ? tokens.spacing.base[4]
          : tokens.spacing.base[6],
    "--hero-button-padding-y":
      size === "S"
        ? tokens.spacing.base[2]
        : size === "M"
          ? tokens.spacing.base[3]
          : tokens.spacing.base[4],
    "--hero-button-font-size": typography.fontSize,
    "--hero-button-line-height": typography.lineHeight,
    "--hero-button-font-weight": typography.fontWeight,
    "--hero-button-transition":
      "background-color 300ms ease-in, color 150ms ease-in, box-shadow 300ms ease-in, transform 300ms ease-in",
    "--navi-blob-color": tokens.colors.button.hero.hover,
    "--navi-hover-x": hoverOrigin.x,
    "--navi-hover-y": hoverOrigin.y,
    "--navi-blob-radius-a": blobVariant.radiusA,
    "--navi-blob-radius-b": blobVariant.radiusB,
    "--navi-blob-radius-c": blobVariant.radiusC,
    "--navi-blob-radius-d": blobVariant.radiusD,
    "--navi-blob-offset-a-x": blobVariant.offsetAX,
    "--navi-blob-offset-a-y": blobVariant.offsetAY,
    "--navi-blob-offset-b-x": blobVariant.offsetBX,
    "--navi-blob-offset-b-y": blobVariant.offsetBY,
    "--navi-blob-offset-c-x": blobVariant.offsetCX,
    "--navi-blob-offset-c-y": blobVariant.offsetCY,
    "--navi-blob-offset-d-x": blobVariant.offsetDX,
    "--navi-blob-offset-d-y": blobVariant.offsetDY,
    "--navi-blob-rotate-a": blobVariant.rotateA,
    "--navi-blob-rotate-b": blobVariant.rotateB,
    "--navi-blob-rotate-c": blobVariant.rotateC,
    "--navi-blob-rotate-d": blobVariant.rotateD,
  } satisfies HeroButtonStyle;

  return (
    <button
      {...props}
      className={[
        "hero-button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap",
        "rounded-[var(--hero-button-radius)] bg-[var(--hero-button-bg)] px-[var(--hero-button-padding-x)] py-[var(--hero-button-padding-y)]",
        "text-[length:var(--hero-button-font-size)] font-[var(--hero-button-font-weight)] leading-[var(--hero-button-line-height)] text-[var(--hero-button-text)]",
        "[transition:var(--hero-button-transition)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-hover={hoverState}
      onBlur={(event) => {
        clearDrainTimeout();
        setHoverState("drain");
        drainTimeoutRef.current = window.setTimeout(() => {
          drainTimeoutRef.current = null;
          setHoverState("idle");
        }, 300);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        clearDrainTimeout();
        setHoverOrigin({ x: "50%", y: "50%" });
        setBlobVariantIndex(
          (currentIndex) => (currentIndex + 1) % blobVariants.length,
        );
        setHoverState("fill");
        onFocus?.(event);
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ ...heroButtonStyle, ...style }}
      type={type}
    >
      <span
        aria-hidden="true"
        className="navi-button__blob navi-button__blob--a"
      />
      <span
        aria-hidden="true"
        className="navi-button__blob navi-button__blob--b"
      />
      <span
        aria-hidden="true"
        className="navi-button__blob navi-button__blob--c"
      />
      <span
        aria-hidden="true"
        className="navi-button__blob navi-button__blob--d"
      />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
