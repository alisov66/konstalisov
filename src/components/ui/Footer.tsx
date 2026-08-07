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
    <footer className="flex h-[152px] w-full shrink-0 flex-col items-center justify-start gap-[var(--base-5)] border-t border-[var(--border-secondary)] px-[var(--padding-side)] py-[var(--base-6)] min-[768px]:h-[96px] min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:content-start min-[768px]:items-start">
      <nav
        aria-label="Footer links"
        className="order-1 flex shrink-0 items-center justify-center gap-[var(--base-5)] min-[768px]:order-2"
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

      <div
        className="order-2 flex min-w-0 flex-col items-center justify-center whitespace-nowrap text-center min-[768px]:order-1 min-[768px]:flex-1 min-[768px]:items-start min-[768px]:text-left"
        style={typeStyle(tokens.typography.body.s)}
      >
        <p className="text-[var(--text-primary)]">© Konstantin Alisov</p>
        <p className="text-[var(--text-tertiary)]">2026</p>
      </div>
    </footer>
  );
}
