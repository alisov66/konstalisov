"use client";

import type {
  AnchorHTMLAttributes,
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { useCallback, useState } from "react";

import { tokens } from "@/styles/tokens";

const maxRotateX = 8;
const maxRotateY = 10;

type ContactButtonStyle = CSSProperties & {
  "--contact-button-transform"?: string;
};

export interface ContactButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}) {
  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
  };
}

export default function ContactButton({
  children,
  className,
  onBlur,
  onFocus,
  onMouseLeave,
  onMouseMove,
  style,
  ...props
}: ContactButtonProps) {
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)",
  );

  const updateTransform = useCallback(
    (element: HTMLElement, clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const offsetX = (clientX - rect.left) / rect.width;
      const offsetY = (clientY - rect.top) / rect.height;
      const lookX = Math.max(-1, Math.min(1, offsetX * 2 - 1));
      const lookY = Math.max(-1, Math.min(1, offsetY * 2 - 1));
      const rotateX = -lookY * maxRotateX;
      const rotateY = lookX * maxRotateY;

      setTransform(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      );
    },
    [],
  );

  const resetTransform = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  }, []);

  const handleMouseMove: MouseEventHandler<HTMLAnchorElement> = (event) => {
    updateTransform(event.currentTarget, event.clientX, event.clientY);
    onMouseMove?.(event);
  };

  const handleMouseLeave: MouseEventHandler<HTMLAnchorElement> = (event) => {
    resetTransform();
    onMouseLeave?.(event);
  };

  const handleFocus: FocusEventHandler<HTMLAnchorElement> = (event) => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
    onFocus?.(event);
  };

  const handleBlur: FocusEventHandler<HTMLAnchorElement> = (event) => {
    resetTransform();
    onBlur?.(event);
  };

  return (
    <a
      {...props}
      className={[
        "contact-button group flex h-full min-h-0 w-full items-center justify-center rounded-[var(--xl)] bg-[var(--bg-beige-light)] p-[var(--base-6)] text-center text-[var(--text-primary)] no-underline",
        "transition-[background-color,transform] duration-300 ease-out hover:bg-[var(--button-hero-hover)] focus-visible:bg-[var(--button-hero-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          "--contact-button-transform": transform,
          transform: "var(--contact-button-transform)",
          transformStyle: "preserve-3d",
          ...typeStyle(tokens.typography.button.large),
          ...style,
        } as ContactButtonStyle
      }
    >
      <span>{children}</span>
    </a>
  );
}
