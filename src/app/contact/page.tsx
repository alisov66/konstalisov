import NavigationHeader from "@/components/ui/NavigationHeader";
import Footer from "@/components/ui/Footer";
import ContactButton from "@/components/ui/ContactButton";
import { pageMetadata } from "@/app/seo";
import { typography } from "@/styles";

export const metadata = pageMetadata({
  title: "Contact | Konstantin Alisov",
  description:
    "Get in touch with Konstantin Alisov for thoughtful conversations about product design, systems, and complex workflows.",
  path: "/contact",
  image: "/og/contact.png",
});

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
      <section className="flex min-h-0 w-full flex-1 flex-col items-start bg-[var(--bg-beige)] px-[var(--padding-side)] pb-[var(--base-10)] pt-[112px] min-[768px]:pb-[var(--base-20)] min-[768px]:pt-[var(--base-32)]">
        <div className="flex w-full flex-col gap-[var(--base-6)] min-[768px]:max-w-[820px]">
          <h1
            className="w-full text-[var(--text-accent)]"
            style={typeStyle(typography.heading.h1)}
          >
            Contact
          </h1>
          <p
            className="w-full text-[var(--text-primary)]"
            style={typeStyle(typography.body.m)}
          >
            Every great product starts with a conversation.
            <br />
            If my work resonates with you, I&apos;d love to hear about the
            challenges you&apos;re solving.
          </p>
        </div>

        <div className="mt-[var(--base-10)] grid min-h-0 w-full max-w-[var(--container-max)] flex-1 auto-rows-fr grid-cols-1 gap-[var(--base-4)] min-[900px]:grid-cols-2 min-[1280px]:mt-[var(--base-20)] min-[1280px]:gap-[var(--base-10)]">
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
