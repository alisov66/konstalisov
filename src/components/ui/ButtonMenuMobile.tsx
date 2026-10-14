"use client";

import { useState, type ButtonHTMLAttributes } from "react";
import usePressState from "./usePressState";

export interface ButtonMenuMobileProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ButtonMenuMobile({
  "aria-label": ariaLabel,
  className,
  onClick,
  onOpenChange,
  open,
  ...props
}: ButtonMenuMobileProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const pressProps = usePressState<HTMLButtonElement>(props);

  return (
    <button
      {...props}
      {...pressProps}
      type="button"
      aria-expanded={isOpen}
      aria-label={ariaLabel || (isOpen ? "Close menu" : "Open menu")}
      className={["button-menu-mobile", className].filter(Boolean).join(" ")}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const nextOpen = !isOpen;
        if (open === undefined) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
      }}
    >
      <span aria-hidden="true" className="button-menu-mobile__icon">
        <span className="button-menu-mobile__line button-menu-mobile__line--top" />
        <span className="button-menu-mobile__line button-menu-mobile__line--bottom" />
      </span>
    </button>
  );
}
