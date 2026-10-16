import type { ReactNode } from "react";
import Footer from "@/components/ui/Footer";
import CvDownloadButton from "@/components/ui/CvDownloadButton";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { GetInTouchSection } from "@/components/sections/HomeSections";
import { pageMetadata } from "@/app/seo";
import { typography, typeStyle } from "@/styles";
import "./cv.css";

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
        dates: "May 2025 \u2014 Aug 2026",
        summary:
          "Sole product designer for an enterprise scientific software ecosystem, responsible for desktop and web experiences, shared interface components, and the public product website.",
        details: [
          "Designed analytical workspaces that let researchers compare complex data, configure visualizations, and adjust layouts and information density to suit different tasks.",
          "Used recordings of customer sessions and feedback from scientists to identify interaction problems, make compatibility rules visible earlier, and revise restrictions that limited valid choices.",
          "Built reusable components and documented their behavior across application views, dialogs, and sheets, supporting both internal engineers and developers using the SDK.",
          "Redesigned the product website\u2019s information architecture and built it in Framer, creating distinct paths for scientific and technical audiences. Collaborated with the CEO on content and technical accuracy, with engineering support for form integrations.",
        ],
      },
    ],
  },
  {
    company: "Alliance Professional Developers (APD)",
    roles: [
      {
        title: "Product Designer",
        dates: "Jul 2023 \u2014 May 2025",
        summary:
          "Owned end-to-end design across web and mobile products, including B2B platforms, CRM and internal tools, logistics, fintech, accommodation, and dating apps. Worked closely with founders, product managers, and engineers from problem definition through implementation.",
        details: [
          "Helped define product requirements and proposed solutions based on user needs, stakeholder input, and technical constraints.",
          "Structured complex workflows and information architecture, defining navigation, interaction rules, and validation and recovery states.",
          "Used prototypes to review proposed workflows with stakeholders, then revised designs using customer feedback and findings from implementation.",
          "Worked closely with engineers through delivery, documenting behavior, reviewing implemented interfaces, and refining components and edge cases.",
        ],
      },
      {
        title: "UX/UI Designer",
        dates: "Dec 2020 \u2014 Jun 2023",
        summary:
          "Designed web and mobile interfaces across business software and consumer applications, adapting layouts and interactions to different audiences and product requirements.",
        details: [
          "Translated business requirements into user flows, wireframes, interactive prototypes, and detailed interface designs.",
          "Established reusable UI patterns and component foundations for consistent experiences across screens and devices.",
          "Worked with product managers and developers to resolve interaction details and adapt designs to technical constraints.",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    roles: [
      {
        title: "UX/UI Designer",
        dates: "Apr 2017 \u2014 Dec 2020",
        summary:
          "Designed websites and digital experiences for small businesses across hospitality, retail, and creative industries.",
        details: [
          "Worked directly with business owners to define goals, organize content, and design responsive websites from initial structure through visual design.",
          "Managed project scope, client feedback, and developer handoff throughout delivery.",
        ],
      },
    ],
  },
];

const education = [
  {
    place: "Skillbox",
    title: "UX/UI Design Program",
    dates: "May 2016 \u2014 Apr 2017",
  },
  {
    place: "Ural State Technical University",
    title: "Economics studies",
    dates: "Sep 2005 \u2014 Mar 2008",
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
    tags: ["Figma agent", "ChatGPT", "Codex", "VS Code"],
    note: "Using AI-assisted development to prototype ideas, understand implementation, and collaborate more effectively with engineers. My portfolio was designed by me and built using AI-assisted workflows with Next.js, Tailwind CSS, GitHub, and Vercel.",
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

function CvSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-band" aria-labelledby={id}>
      <div className="page-container cv-panel">
        <div className="section-title cv-section-title">
          <h2 id={id} style={typeStyle(typography.heading.h3)}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function SkillTags({ tags }: { tags: string[] }) {
  return (
    <ul className="cv-tags" style={typeStyle(typography.body.m)}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function AccentSummary({ children }: { children: string }) {
  return (
    <div className="cv-summary">
      <span aria-hidden="true" className="cv-summary__bar" />
      <p style={typeStyle(typography.body.m)}>{children}</p>
    </div>
  );
}

function ParagraphList({ items }: { items: string[] }) {
  return (
    <ul
      className="cv-bullets"
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
    <div className="cv-role">
      <div className="cv-row cv-role__heading">
        <h4 style={typeStyle(typography.heading.h5)}>{title}</h4>
        <p style={typeStyle(typography.body.s)}>{dates}</p>
      </div>
      <div className="cv-role__summary"><AccentSummary>{summary}</AccentSummary></div>
      <div className="cv-role__details"><ParagraphList items={details} /></div>
    </div>
  );
}

function CompactEntry({
  caption,
  dates,
  title,
}: {
  caption: string;
  dates: string;
  title: string;
}) {
  return (
    <div className="cv-entry">
      <h3 style={typeStyle(typography.heading.h5)}>{title}</h3>
      <div className="cv-entry__caption">
        <p style={typeStyle(typography.body.m)}>{caption}</p>
        <p style={typeStyle(typography.body.s)}>{dates}</p>
      </div>
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="cv-page">
      <NavigationHeader alwaysVisible />
      <section className="cv-hero" aria-labelledby="cv-title">
        <div className="page-container">
          <div className="cv-hero__content">
            <div className="cv-hero__title">
              <h1 id="cv-title" style={typeStyle(typography.heading.h1)}>Konstantin Alisov</h1>
              <div className="cv-hero__info" style={typeStyle(typography.body.m)}>
                <p style={{ fontWeight: typography.fontWeight.semibold }}>Senior Product Designer</p>
                <p className="cv-caption">Bilbao, Spain</p>
              </div>
            </div>
            <p className="cv-hero__description" style={typeStyle(typography.body.m)}>
              Product designer with 9+ years of experience across web and mobile products.
              <br />I turn complex requirements into clear workflows and reusable interface patterns,
              working closely with product and engineering teams. My work spans understanding user
              needs, interaction design, design systems, and implementation review.
            </p>
            <CvDownloadButton href={cvPdfHref} />
          </div>
        </div>
      </section>

      <CvSection id="cv-expertise" title="Core expertise">
        <div className="cv-row cv-expertise"><SkillTags tags={coreExpertise} /></div>
      </CvSection>

      <CvSection id="cv-experience" title="Experience">
        {experience.map((company, index) => (
          <section key={company.company} aria-labelledby={`cv-company-${index}`}>
            <div className="cv-row cv-company">
              <h3 id={`cv-company-${index}`} style={typeStyle(typography.heading.h4)}>{company.company}</h3>
            </div>
            {company.roles.map((role) => <ExperienceRole key={role.title} {...role} />)}
          </section>
        ))}
      </CvSection>

      <CvSection id="cv-education" title="Education & training">
        <div className="cv-entries">
          {education.map((item) => (
            <CompactEntry key={item.place} title={item.place} caption={item.title} dates={item.dates} />
          ))}
        </div>
      </CvSection>

      <CvSection id="cv-certifications" title="Certifications">
        <div className="cv-entries">
          {certifications.map((item) => (
            <CompactEntry key={item.title} title={item.title} caption={item.issuer} dates={item.dates} />
          ))}
        </div>
      </CvSection>

      <CvSection id="cv-tools" title="Tools & workflow">
        {tools.map((group) => (
          <section className="cv-row cv-tool-group" key={group.title} aria-label={group.title}>
            <h3 style={typeStyle(typography.heading.h5)}>{group.title}</h3>
            <SkillTags tags={group.tags} />
            {group.note ? <div className="cv-tool-group__note"><AccentSummary>{group.note}</AccentSummary></div> : null}
          </section>
        ))}
      </CvSection>

      <CvSection id="cv-languages" title="Languages">
        <div className="cv-entries cv-entries--languages">
          {languages.map((item) => (
            <div className="cv-entry" key={item.language}>
              <h3 style={typeStyle(typography.heading.h5)}>{item.language}</h3>
              <p style={typeStyle(typography.body.m)}>{item.level}</p>
            </div>
          ))}
        </div>
      </CvSection>

      <GetInTouchSection />
      <Footer />
    </main>
  );
}
