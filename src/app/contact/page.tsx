import NavigationHeader from "@/components/ui/NavigationHeader";
import Footer from "@/components/ui/Footer";
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <section className="flex min-h-screen w-full flex-col items-start gap-[var(--base-3)] px-[var(--padding-side)] pt-[var(--base-40)]">
        <h1
          className="text-[var(--text-accent)]"
          style={typeStyle(tokens.typography.heading.h1)}
        >
          Contact
        </h1>
        <p
          className="text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.body.medium)}
        >
          Coming soon.
        </p>
      </section>
      <Footer />
    </main>
  );
}
