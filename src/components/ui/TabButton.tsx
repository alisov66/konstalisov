import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { colors, radius, spacing, typography } from "@/styles";

type TabButtonStyle = CSSProperties &
  Record<`--tab-button-${string}`, string | number>;

export interface TabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  level?: TabButtonLevel;
  selected?: boolean;
}

export type TabButtonLevel = "capability" | "article";

export function getTabButtonStyle(
  selected = false,
  level: TabButtonLevel = "capability",
): TabButtonStyle {
  const textColor = colors.button.text;
  const selectedBackground =
    level === "article"
      ? colors.button.fillAccent
      : colors.button.fillAccentMuted;

  return {
    "--tab-button-bg": selected
      ? selectedBackground
      : "transparent",
    "--tab-button-hover-bg": selected
      ? selectedBackground
      : colors.button.fillLight,
    "--tab-button-text": textColor,
    "--tab-button-radius": radius.pill,
    "--tab-button-padding-x": spacing.base[4],
    "--tab-button-padding-y": spacing.base[2],
    "--tab-button-font-size": typography.button.m.fontSize,
    "--tab-button-line-height": typography.button.m.lineHeight,
    "--tab-button-font-weight": typography.button.m.fontWeight,
    "--tab-button-focus-ring": `inset 0 0 0 ${colors.border.width.medium} ${colors.border.focus}`,
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
    "transition-[background-color,color,box-shadow] duration-[160ms] ease-out hover:bg-[var(--tab-button-hover-bg)] hover:shadow-[var(--tab-button-hover-shadow)] active:shadow-[var(--tab-button-active-shadow)] focus-visible:shadow-[var(--tab-button-focus-ring)] focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function TabButton({
  children,
  className,
  level = "capability",
  selected = false,
  type = "button",
  ...props
}: TabButtonProps) {
  const style = getTabButtonStyle(selected, level);

  return (
    <button
      {...props}
      aria-selected={selected}
      className={getTabButtonClassName(className)}
      data-level={level}
      data-selected={selected || undefined}
      role="tab"
      style={{ ...style, ...props.style }}
      type={type}
    >
      {children}
    </button>
  );
}
