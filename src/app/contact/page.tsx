import NavigationHeader from "@/components/ui/NavigationHeader";
import Footer from "@/components/ui/Footer";
import ContactButton from "@/components/ui/ContactButton";
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
      <section className="flex w-full flex-col items-start bg-[var(--bg-beige)] px-[var(--padding-side)] pb-[var(--base-6)] pt-[var(--base-30)]">
        <h1
          className="w-full text-[var(--text-accent)]"
          style={typeStyle(tokens.typography.heading.h2)}
        >
          Contact
        </h1>
        <p
          className="mt-[var(--base-20)] w-full max-w-[var(--container-max)] text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.body.medium)}
        >
          I&apos;m always open to thoughtful conversations about product design,
          systems, and complex workflows.
        </p>

        <div className="mt-[var(--base-20)] grid w-full max-w-[var(--container-max)] grid-cols-1 gap-[var(--base-10)] min-[900px]:grid-cols-2">
          <ContactButton href="mailto:alisovdesign@gmail.com">
            Email
          </ContactButton>
          <ContactButton
            href="https://www.linkedin.com/in/konstantin-alisov/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </ContactButton>
        </div>
      </section>
      <Footer />
    </main>
  );
}
