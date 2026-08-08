import type { AnchorHTMLAttributes, ReactNode } from "react";

import { tokens } from "@/styles/tokens";

interface ButtonTertiaryProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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

export default function ButtonTertiary({
  children,
  className,
  ...props
}: ButtonTertiaryProps) {
  return (
    <a
      {...props}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-[var(--pill)] px-[var(--base-4)] py-[var(--base-2)]",
        "text-[var(--text-primary)] transition-colors duration-150 ease-in hover:bg-[var(--button-fill-accent)] focus-visible:bg-[var(--button-fill-accent)] focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...typeStyle(tokens.typography.button.mMedium), ...props.style }}
    >
      {children}
    </a>
  );
}
