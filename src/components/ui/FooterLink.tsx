import type { AnchorHTMLAttributes, ReactNode } from "react";

import { tokens } from "@/styles/tokens";

interface FooterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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

export default function FooterLink({
  children,
  className,
  ...props
}: FooterLinkProps) {
  return (
    <a
      {...props}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-[var(--pill)] px-[var(--base-4)] py-[var(--base-2)]",
        "text-[var(--text-primary)] transition-colors duration-150 ease-in hover:bg-[var(--bg-beige-light)] focus-visible:bg-[var(--bg-beige-light)] focus-visible:outline-none",
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
