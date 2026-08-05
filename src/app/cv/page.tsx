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

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <section className="flex min-h-screen w-full items-start px-[var(--padding-side)] pt-[var(--base-40)]">
        <h1
          className="text-[var(--text-accent)]"
          style={typeStyle(tokens.typography.heading.h1)}
        >
          Download CV
        </h1>
      </section>
      <Footer />
    </main>
  );
}
