import ButtonPrimary from "@/components/ui/ButtonPrimary";
import { typography } from "@/styles";
import Image from "next/image";

const profilePhotoSrc = "/about/profile-photo.png";

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
  const introCopy = (
    <div className="flex w-full max-w-[820px] flex-col gap-[var(--base-3)] text-[var(--text-primary)]">
      <h3 style={typeStyle(typography.heading.h3)}>
        I enjoy figuring out how complicated things work
      </h3>
      <p style={typeStyle(typography.body.m)}>
        I&apos;m naturally drawn to understanding how complicated things
        work. Whether it&apos;s scientific research, financial systems,
        or product architecture, I enjoy asking questions, uncovering
        patterns, and turning complexity into products people can use with
        confidence.
      </p>
      <p style={typeStyle(typography.body.m)}>
        The products I work on are different, but the motivation is
        usually the same: helping people feel confident in complex
        environments.
      </p>
    </div>
  );

  return (
    <section
      className="flex w-full flex-col items-start gap-[var(--base-10)] bg-[var(--bg-beige)] px-[var(--padding-side)] pb-[var(--base-10)] pt-[72px] min-[768px]:pb-[var(--base-20)] min-[768px]:pt-[var(--base-32)]"
      id="about"
    >
      <h1
        className="w-full text-[var(--text-accent)]"
        style={typeStyle(typography.heading.h1)}
      >
        About
      </h1>

      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col flex-wrap items-start gap-[var(--base-10)] min-[768px]:flex-row min-[1440px]:gap-[var(--base-15)] min-[1600px]:gap-[var(--base-20)]">
        <div className="flex w-full max-w-[600px] shrink-0 flex-col gap-[var(--base-5)] min-[768px]:sticky min-[768px]:top-[108px] min-[768px]:w-[320px] min-[1130px]:w-[450px]">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-t-[240px]">
            <Image
              alt="Konstantin Alisov"
              className="size-full object-cover"
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1129px) 320px, 450px"
              src={profilePhotoSrc}
            />
          </div>

          <div className="flex w-full flex-col gap-[var(--base-1)]">
            <p
              className="text-[var(--text-accent)]"
              style={typeStyle(typography.heading.h5)}
            >
              Currently based
            </p>
            <p
              className="text-[var(--text-primary)]"
              style={typeStyle(typography.body.m)}
            >
              Bilbao, Spain
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 min-[768px]:max-[1129px]:flex">
          {introCopy}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-[var(--base-10)] min-[332px]:min-w-[300px] min-[482px]:min-w-[min(400px,100%)] min-[1130px]:gap-[var(--base-15)]">
          <div className="min-[768px]:max-[1129px]:hidden">
            {introCopy}
          </div>

          <div className="flex w-full flex-col items-start gap-[var(--base-10)] text-[var(--text-primary)]">
            <div className="flex w-full min-w-[292px] max-w-[820px] flex-col gap-[var(--base-1)]">
              <h4
                className="text-[var(--text-accent)]"
                style={typeStyle(typography.heading.h5)}
              >
                Exploring
              </h4>
              <ul
                className="list-disc pl-[30px]"
                style={typeStyle(typography.body.m)}
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
                style={typeStyle(typography.heading.h5)}
              >
                Building
              </h4>
              <p style={typeStyle(typography.body.m)}>
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
                style={typeStyle(typography.heading.h5)}
              >
                Working style
              </h4>
              <p style={typeStyle(typography.body.m)}>
                I enjoy partnering closely with product managers and engineers,
                bringing structure to ambiguous problems through systems
                thinking before polishing interfaces.
              </p>
            </div>
          </div>

          <ButtonPrimary className="w-full min-[768px]:w-auto" href="/cv">
            View CV
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
}
