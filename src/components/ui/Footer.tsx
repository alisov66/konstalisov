import FooterLink from "@/components/ui/FooterLink";
import { tokens } from "@/styles/tokens";

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

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start justify-between gap-[var(--base-5)] border-t border-[var(--border-secondary)] px-[var(--padding-side)] py-[var(--base-6)] min-[768px]:flex-row min-[768px]:items-center">
      <div
        className="flex shrink-0 flex-col items-start justify-center whitespace-nowrap"
        style={typeStyle(tokens.typography.body.s)}
      >
        <p
          className="text-[var(--text-secondary)]"
          style={{ fontWeight: tokens.typography.fontWeight.semibold }}
        >
          © Konstantin Alisov
        </p>
        <p className="text-[var(--text-tertiary)]">2026</p>
      </div>

      <nav
        aria-label="Footer links"
        className="flex shrink-0 items-center gap-[var(--base-5)]"
      >
        <FooterLink href="mailto:alisovdesign@gmail.com">Email</FooterLink>
        <FooterLink
          href="https://www.linkedin.com/in/konstantin-alisov/"
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </FooterLink>
      </nav>
    </footer>
  );
}
