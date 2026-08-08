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
    <footer className="flex w-full shrink-0 flex-col items-center justify-center bg-[var(--bg-beige-soft)] px-[var(--padding-side)] py-[var(--base-6)] min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:content-start min-[768px]:items-start min-[768px]:gap-[var(--base-5)]">
      <div
        className="flex min-w-0 flex-col items-center justify-center whitespace-nowrap text-center min-[768px]:flex-1"
        style={typeStyle(tokens.typography.body.xs)}
      >
        <p className="text-[var(--text-secondary)]">© Konstantin Alisov</p>
        <p className="text-[var(--text-tertiary)]">2026</p>
      </div>
    </footer>
  );
}
