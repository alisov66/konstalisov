import ButtonPrimary from "@/components/ui/ButtonPrimary";
import { tokens } from "@/styles/tokens";
import Image from "next/image";

const profilePhotoSrc = "/about/profile-photo.jpg";

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

export default function AboutSection() {
  return (
    <section
      className="mb-[var(--base-20)] flex w-full flex-col items-start gap-[var(--base-20)] bg-[var(--bg-beige)] px-[var(--padding-side)] py-[var(--base-30)]"
      id="about"
    >
      <h1
        className="w-full text-[var(--text-accent)]"
        style={typeStyle(tokens.typography.heading.h1)}
      >
        About
      </h1>

      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-wrap items-start gap-[var(--base-10)] min-[1600px]:gap-[var(--base-20)]">
        <div className="flex w-full max-w-[600px] shrink-0 flex-col gap-[var(--base-5)] min-[482px]:w-[450px] min-[1130px]:sticky min-[1130px]:top-[108px]">
          <div className="relative aspect-[3/4] max-h-[600px] w-full max-w-[450px] shrink-0 overflow-hidden min-[482px]:h-[600px] min-[482px]:aspect-auto">
            <Image
              alt="Konstantin Alisov"
              className="size-full object-cover"
              fill
              sizes="(max-width: 481px) calc(100vw - 32px), 450px"
              src={profilePhotoSrc}
            />
          </div>

          <div className="flex w-full flex-col gap-[var(--base-1)]">
            <p
              className="text-[var(--text-accent)]"
              style={typeStyle(tokens.typography.heading.h5)}
            >
              Currently based
            </p>
            <p
              className="text-[var(--text-primary)]"
              style={typeStyle(tokens.typography.body.medium)}
            >
              Bilbao, Spain
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-[var(--base-15)] min-[332px]:min-w-[300px] min-[482px]:min-w-[min(400px,100%)]">
          <div className="flex w-full max-w-[820px] flex-col gap-[var(--base-3)] text-[var(--text-primary)]">
            <h3 style={typeStyle(tokens.typography.heading.h3)}>
              I enjoy figuring out how complicated things work
            </h3>
            <p style={typeStyle(tokens.typography.body.medium)}>
              I&apos;m naturally drawn to understanding how complicated things
              work. Whether it&apos;s scientific research, financial systems,
              or product architecture, I enjoy asking questions, uncovering
              patterns, and turning complexity into products people can use with
              confidence.
            </p>
            <p style={typeStyle(tokens.typography.body.medium)}>
              The products I work on are different, but the motivation is
              usually the same: helping people feel confident in complex
              environments.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-[var(--base-10)] text-[var(--text-primary)]">
            <div className="flex w-full min-w-[292px] max-w-[820px] flex-col gap-[var(--base-1)]">
              <h4
                className="text-[var(--text-accent)]"
                style={typeStyle(tokens.typography.heading.h5)}
              >
                Exploring
              </h4>
              <ul
                className="list-disc pl-[30px]"
                style={typeStyle(tokens.typography.body.medium)}
              >
                <li className="mb-[var(--base-2)]">
                  Exploring AI-assisted development
                </li>
                <li className="mb-[var(--base-2)]">
                  Learning modern frontend technologies
                </li>
                <li>Building products with Next.js, Tailwind CSS & Vercel</li>
              </ul>
            </div>

            <div className="flex w-full min-w-[292px] max-w-[820px] flex-col gap-[var(--base-1)]">
              <h4
                className="text-[var(--text-accent)]"
                style={typeStyle(tokens.typography.heading.h5)}
              >
                Building
              </h4>
              <p style={typeStyle(tokens.typography.body.medium)}>
                <strong className="font-[var(--font-weight-semibold)]">
                  I designed this portfolio and built it using AI-assisted
                  development with Next.js, Tailwind CSS, GitHub, and Vercel.
                </strong>{" "}
                Understanding implementation helps me design products that are
                realistic to build and collaborate more effectively with
                engineers.
              </p>
            </div>

            <div className="flex w-full min-w-[292px] max-w-[820px] flex-col gap-[var(--base-1)]">
              <h4
                className="text-[var(--text-accent)]"
                style={typeStyle(tokens.typography.heading.h5)}
              >
                Working style
              </h4>
              <p style={typeStyle(tokens.typography.body.medium)}>
                I enjoy partnering closely with product managers and engineers,
                bringing structure to ambiguous problems through systems
                thinking before polishing interfaces.
              </p>
            </div>
          </div>

          <ButtonPrimary href="/cv">
            View CV
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
}
