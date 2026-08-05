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
    <main className="flex min-h-dvh flex-col bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <section className="mb-[var(--base-24)] flex w-full flex-1 flex-col items-start bg-[var(--bg-beige)] px-[var(--padding-side)] py-[var(--base-24)] min-[768px]:mb-[var(--base-30)] min-[768px]:py-[var(--base-30)]">
        <div className="flex w-full max-w-[var(--container-max)] flex-col gap-[var(--base-6)]">
          <h1
            className="w-full text-[var(--text-accent)]"
            style={typeStyle(tokens.typography.heading.h1)}
          >
            Contact
          </h1>
          <p
            className="w-full text-[var(--text-primary)]"
            style={typeStyle(tokens.typography.body.medium)}
          >
            I&apos;m always open to thoughtful conversations about product
            design, systems, and complex workflows.
          </p>
        </div>

        <div className="mt-[var(--base-10)] grid w-full max-w-[var(--container-max)] flex-1 auto-rows-fr grid-cols-1 gap-[var(--base-4)] min-[900px]:grid-cols-2 min-[1280px]:mt-[var(--base-20)] min-[1280px]:gap-[var(--base-10)]">
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
