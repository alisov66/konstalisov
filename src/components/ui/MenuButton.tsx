"use client";

import type { ButtonHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

type MenuButtonPhase = "idle" | "menuToCross" | "crossToMenu";

export interface MenuButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function MenuButton({
  "aria-label": ariaLabel,
  className,
  onClick,
  onOpenChange,
  open,
  ...props
}: MenuButtonProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [phase, setPhase] = useState<MenuButtonPhase>("idle");
  const previousOpenRef = useRef(open ?? internalOpen);
  const isControlled = open !== undefined;
  const isOpen = open ?? internalOpen;

  useEffect(() => {
    if (previousOpenRef.current === isOpen) {
      return;
    }

    previousOpenRef.current = isOpen;
    setPhase(isOpen ? "menuToCross" : "crossToMenu");
  }, [isOpen]);

  function handleAnimationEnd() {
    setPhase("idle");
  }

  const iconState = phase === "idle" ? (isOpen ? "cross" : "menu") : phase;
  const isAnimating = phase !== "idle";

  return (
    <button
      {...props}
      aria-expanded={isOpen}
      aria-label={ariaLabel || (isOpen ? "Close menu" : "Open menu")}
      className={[
        "menu-button flex shrink-0 cursor-pointer flex-col items-start justify-center rounded-[var(--lg)] p-[var(--base-3)] text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-primary)]",
        isAnimating
          ? "bg-[var(--button-secondary-hover)]"
          : "bg-[var(--bg-beige-light)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={iconState}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        const nextOpen = !isOpen;
        setPhase(nextOpen ? "menuToCross" : "crossToMenu");

        if (!isControlled) {
          setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
      }}
      type="button"
    >
      <span
        aria-hidden
        className="menu-button__icon relative size-[20px] overflow-hidden"
      >
        <span
          className="menu-button__line menu-button__line--top"
          onAnimationEnd={handleAnimationEnd}
        />
        <span className="menu-button__line menu-button__line--bottom" />
      </span>
    </button>
  );
}
