import Footer from "@/components/ui/Footer";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { pageMetadata } from "@/app/seo";
import { typography } from "@/styles";

const cvPdfHref = "/Konstantin-Alisov-CV.pdf";

export const metadata = pageMetadata({
  title: "CV | Konstantin Alisov",
  description:
    "View Konstantin Alisov's product design CV, experience, expertise, and tools.",
  path: "/cv",
  image: "/og/cv.png",
});

const coreExpertise = [
  "Complex workflow design",
  "Enterprise software",
  "System thinking",
  "Information architecture",
  "Design systems",
  "Cross-functional collaboration",
  "Product discovery",
  "Technical documentation",
];

const experience = [
  {
    company: "MiLaboratories",
    roles: [
      {
        title: "Product Designer",
        dates: "May 2025 - Aug 2026",
        summary:
          "Sole Product Designer for Platforma, an enterprise software ecosystem for immunology and bioinformatics. Owned product design across desktop applications, web services, design systems, technical documentation, and product communication, helping researchers navigate complex analytical workflows with confidence.",
        details: [
          "Designed complex analytical workflows, including Data Mapping and sequence analysis, helping researchers navigate metadata compatibility, dense biological datasets, and advanced visualizations with greater clarity and confidence.",
          "Built a scalable design system with reusable components, interaction patterns, and implementation documentation, improving consistency and reducing one-off interface decisions across Platforma desktop applications and web services.",
          "Led the redesign of Platforma's public enterprise website, transforming a collection of products into a coherent enterprise platform story for customers and partners.",
          "Created technical documentation and product specifications that reduced ambiguity and strengthened collaboration between design, product, engineering, and marketing.",
        ],
      },
    ],
  },
  {
    company: "Alliance Professional Developers (APD)",
    roles: [
      {
        title: "Product Designer",
        dates: "Jul 2023 - May 2025",
        summary:
          "Owned product design from discovery through delivery, partnering with founders and product teams to define product direction, structure complex systems, and validate solutions before implementation.",
        details: [
          "Led end-to-end product design from discovery through delivery, aligning business goals, user needs, and technical feasibility throughout the product lifecycle.",
          "Shaped product direction through close collaboration with founders, product managers, and engineers, enabling faster and better-informed product decisions.",
          "Designed information architecture for products with complex workflows and business logic, making sophisticated functionality easier to understand and navigate.",
          "Designed mobile financial product workflows involving blockchain transactions, AML verification, staking, and multi-account management, translating complex financial concepts into intuitive user experiences.",
          "Created prototypes and product documentation that aligned stakeholders earlier and accelerated product decisions before implementation.",
        ],
      },
      {
        title: "UX/UI Designer",
        dates: "Dec 2020 - Jun 2023",
        summary:
          "Designed web and mobile interfaces across multiple industries, translating business requirements into usable, visually consistent products while building strong foundations in interaction design and UI systems.",
        details: [
          "Designed responsive web and mobile interfaces across fintech, logistics, healthcare, and enterprise software, balancing usability with business and technical requirements.",
          "Designed user flows, wireframes, prototypes, and high-fidelity interfaces that transformed complex requirements into intuitive user experiences.",
          "Established reusable UI patterns and scalable design system foundations, improving consistency across digital products.",
          "Collaborated closely with product managers and developers throughout the product lifecycle, ensuring design decisions remained practical and feasible.",
          "Delivered user-centered solutions balancing business goals, technical constraints, and usability to support successful product delivery.",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    roles: [
      {
        title: "UX/UI Designer",
        dates: "Apr 2017 - Dec 2020",
        summary:
          "Independent design practice focused on websites and digital experiences for small businesses, combining UX thinking, information architecture, and visual design from concept through delivery.",
        details: [
          "Delivered end-to-end website design, from discovery and information architecture to visual design and developer handoff, ensuring a smooth transition from concept to implementation.",
          "Designed responsive websites and digital experiences for businesses across hospitality, retail, and creative industries, helping clients establish clear and effective digital presences.",
          "Designed user flows, wireframes, prototypes, and high-fidelity interfaces that translated business goals into intuitive customer experiences.",
          "Partnered directly with founders and business owners to define goals and translate them into effective digital experiences.",
          "Managed independent client relationships from project scoping through delivery, ensuring clear communication and successful project execution.",
        ],
      },
    ],
  },
];

const education = [
  {
    place: "Skillbox",
    title: "UX/UI Design Program",
    dates: "May 2016 - Apr 2017",
  },
  {
    place: "Ural State Technical University",
    title: "Economics studies",
    dates: "Sep 2005 - Mar 2008",
  },
];

const certifications = [
  {
    title: "Google AI Professional Certificate",
    issuer: "Google",
    dates: "Jun 2026",
  },
  {
    title: "Data-driven product research & design",
    issuer: "LinkedIn",
    dates: "Jun 2026",
  },
];

const tools = [
  {
    title: "Design",
    tags: ["Figma", "FigJam", "Adobe Illustrator", "Rive", "Spline"],
  },
  {
    title: "AI-assisted development",
    tags: ["ChatGPT", "Codex", "VS Code"],
    note: "Using AI-assisted development to prototype ideas, understand implementation, and collaborate more effectively with engineers. This portfolio was designed by me and built using AI-assisted workflows with Next.js, Tailwind CSS, GitHub, and Vercel.",
  },
  {
    title: "Collaboration",
    tags: ["GitHub", "Notion", "Slack"],
  },
];

const languages = [
  {
    language: "English",
    level: "Professional working proficiency",
  },
  {
    language: "Spanish",
    level: "A2 (actively improving)",
  },
  {
    language: "Russian",
    level: "Native",
  },
];

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

function SectionHeading({ children }: { children: string }) {
  return (
    <h2
      className="text-[var(--text-accent)]"
      style={typeStyle(typography.heading.h3)}
    >
      {children}
    </h2>
  );
}

function SkillTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex w-full max-w-[820px] flex-wrap gap-[var(--base-2)]">
      {tags.map((tag) => (
        <span
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--pill)] bg-[var(--bg-beige-soft)] px-[var(--base-3)] py-[var(--base-1)] text-[var(--text-primary)] [word-break:break-word]"
          key={tag}
          style={typeStyle(typography.body.m)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function AccentSummary({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-[832px] items-stretch gap-[var(--base-2)]">
      <span
        aria-hidden
        className="w-[4px] shrink-0 rounded-[var(--pill)] bg-[var(--button-fill-accent)]"
      />
      <p
        className="max-w-[820px] text-[var(--text-primary)]"
        style={typeStyle(typography.body.m)}
      >
        {children}
      </p>
    </div>
  );
}

function ParagraphList({ items }: { items: string[] }) {
  return (
    <ul
      className="flex max-w-[820px] list-disc flex-col gap-[var(--base-2)] pl-[30px] text-[var(--text-primary)]"
      style={typeStyle(typography.body.m)}
    >
      {items.map((item) => (
        <li key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExperienceRole({
  dates,
  details,
  summary,
  title,
}: {
  dates: string;
  details: string[];
  summary: string;
  title: string;
}) {
  return (
    <article className="flex w-full flex-col gap-[var(--base-4)]">
      <div className="flex flex-wrap gap-x-[var(--base-6)] gap-y-[var(--base-1)]">
        <h4
          className="text-[var(--text-primary)]"
          style={typeStyle(typography.heading.h5)}
        >
          {title}
        </h4>
        <p
          className="text-[var(--text-secondary)]"
          style={typeStyle(typography.body.m)}
        >
          {dates}
        </p>
      </div>

      <AccentSummary>{summary}</AccentSummary>
      <ParagraphList items={details} />
    </article>
  );
}

function CompactEntry({
  meta,
  title,
}: {
  meta: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[var(--base-2)]">
      <h3
        className="text-[var(--text-primary)]"
        style={typeStyle(typography.heading.h5)}
      >
        {title}
      </h3>
      <p
        className="whitespace-pre-line text-[var(--text-primary)]"
        style={typeStyle(typography.body.m)}
      >
        {meta}
      </p>
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <section className="flex w-full flex-col items-start gap-[var(--base-10)] px-[var(--padding-side)] pb-[var(--base-20)] pt-[112px] min-[768px]:items-center min-[768px]:pt-[var(--base-32)]">
        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <div className="flex w-full flex-col gap-[var(--base-6)]">
            <h1
              className="text-[var(--text-accent)]"
              style={typeStyle(typography.heading.h1)}
            >
              Konstantin Alisov
            </h1>

            <div className="flex flex-col gap-[var(--base-2)]">
              <p
                className="text-[var(--text-primary)]"
                style={{
                  ...typeStyle(typography.body.m),
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                Product Designer
              </p>
              <div
                className="flex flex-col gap-[var(--base-1)] text-[var(--text-secondary)]"
                style={typeStyle(typography.body.m)}
              >
                <p>Bilbao, Spain</p>
                <p>Updated: Aug 2026</p>
              </div>
            </div>
          </div>

          <p
            className="max-w-[820px] whitespace-pre-line text-[var(--text-primary)]"
            style={typeStyle(typography.body.m)}
          >
            Product designer with 9+ years of experience designing enterprise
            software, complex workflows, and information-rich interfaces.
            {"\n"}I transform ambiguous requirements into scalable products
            through systems thinking, strong UX foundations, and close
            collaboration with product and engineering. I use AI-assisted
            development to prototype ideas, better understand implementation,
            and collaborate more effectively with engineers.
          </p>

          <ButtonPrimary
            className="w-fit"
            href={cvPdfHref}
            rel="noreferrer"
            target="_blank"
          >
            Download PDF
          </ButtonPrimary>
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Core expertise</SectionHeading>
          <SkillTags tags={coreExpertise} />
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Experience</SectionHeading>

          <div className="flex w-full flex-col gap-[var(--base-10)]">
            {experience.map((company) => (
              <section className="flex w-full flex-col gap-[var(--base-4)]" key={company.company}>
                <h3
                  className="text-[var(--text-secondary)]"
                  style={typeStyle(typography.heading.h4)}
                >
                  {company.company}
                </h3>
                <div className="flex w-full flex-col gap-[var(--base-6)]">
                  {company.roles.map((role) => (
                    <ExperienceRole key={`${company.company}-${role.title}`} {...role} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Education & training</SectionHeading>
          <div className="flex flex-col gap-[var(--base-6)]">
            {education.map((item) => (
              <CompactEntry
                key={item.place}
                meta={`${item.title}\n${item.dates}`}
                title={item.place}
              />
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Certifications</SectionHeading>
          <div className="flex flex-col gap-[var(--base-6)]">
            {certifications.map((item) => (
              <CompactEntry
                key={item.title}
                meta={`${item.issuer}\n${item.dates}`}
                title={item.title}
              />
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Tools & workflow</SectionHeading>
          <div className="flex flex-col gap-[var(--base-6)]">
            {tools.map((group) => (
              <div className="flex flex-col gap-[var(--base-3)]" key={group.title}>
                <h3
                  className="text-[var(--text-primary)]"
                  style={typeStyle(typography.heading.h5)}
                >
                  {group.title}
                </h3>
                <SkillTags tags={group.tags} />
                {group.note ? <AccentSummary>{group.note}</AccentSummary> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[820px] flex-col gap-[var(--base-6)]">
          <SectionHeading>Languages</SectionHeading>
          <div className="flex flex-col gap-[var(--base-6)]">
            {languages.map((item) => (
              <CompactEntry
                key={item.language}
                meta={item.level}
                title={item.language}
              />
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
