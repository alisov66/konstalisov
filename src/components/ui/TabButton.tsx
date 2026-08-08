import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { tokens } from "@/styles/tokens";

type TabButtonStyle = CSSProperties &
  Record<`--tab-button-${string}`, string | number>;

export interface TabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function getTabButtonStyle(selected = false): TabButtonStyle {
  const textColor = tokens.colors.button.hero.text;

  return {
    "--tab-button-bg": selected
      ? tokens.colors.button.hero.hover
      : "transparent",
    "--tab-button-hover-bg": selected
      ? tokens.colors.button.hero.hover
      : tokens.colors.button.secondary.hover,
    "--tab-button-text": textColor,
    "--tab-button-radius": tokens.radius.pill,
    "--tab-button-padding-x": tokens.spacing.base[4],
    "--tab-button-padding-y": tokens.spacing.base[2],
    "--tab-button-font-size": tokens.typography.button.medium.fontSize,
    "--tab-button-line-height": tokens.typography.button.medium.lineHeight,
    "--tab-button-font-weight": tokens.typography.button.medium.fontWeight,
    "--tab-button-hover-shadow": "none",
    "--tab-button-active-shadow": "none",
    color: textColor,
  } satisfies TabButtonStyle;
}

export function getTabButtonClassName(className?: string) {
  return [
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap",
    "rounded-[var(--tab-button-radius)] bg-[var(--tab-button-bg)] px-[var(--tab-button-padding-x)] py-[var(--tab-button-padding-y)]",
    "text-[length:var(--tab-button-font-size)] font-[var(--tab-button-font-weight)] leading-[var(--tab-button-line-height)] text-[var(--tab-button-text)]",
    "transition-[background-color,color,box-shadow] duration-[160ms] ease-out hover:bg-[var(--tab-button-hover-bg)] hover:shadow-[var(--tab-button-hover-shadow)] active:shadow-[var(--tab-button-active-shadow)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function TabButton({
  children,
  className,
  selected = false,
  type = "button",
  ...props
}: TabButtonProps) {
  const style = getTabButtonStyle(selected);

  return (
    <button
      {...props}
      aria-selected={selected}
      className={getTabButtonClassName(className)}
      data-selected={selected || undefined}
      role="tab"
      style={{ ...style, ...props.style }}
      type={type}
    >
      {children}
    </button>
  );
}
