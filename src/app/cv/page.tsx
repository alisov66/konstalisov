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

const experience = [
  {
    company: "MiLaboratories",
    description:
      "Biotechnology software company developing tools for biological data analysis, including Platforma.",
    roles: [
      {
        title: "Product Designer",
        dates: "May 2025 — Aug 2026",
        summary:
          "Sole product designer for Platforma, scientific software for biologists and bioinformaticians. Owned desktop and web experiences, shared interface components, and the product website, collaborating with scientists, engineers, and company leadership.",
        details: [
          "Designed a sequence-analysis workspace from the ground up, with two task-specific presets and adjustable layouts for exploring sequence alignments and lineage relationships.",
          "Shaped research questions and observation priorities for CEO-led customer sessions involving 50+ biologists and bioinformaticians. Used session recordings and scientist feedback to redesign data selection and visualization configuration, making compatibility rules visible before selection and removing restrictions that blocked valid choices.",
          "Introduced automatic, editable block subtitles and search to help users distinguish similar analyses without opening each block.",
          "Built 20+ reusable interface components and documented their behavior for internal engineers and developers building blocks with Platforma’s SDK.",
          "Redesigned the product website’s information architecture and built it in Framer, creating distinct paths for scientific and technical audiences. Worked with the CEO on content and engineers on form integrations.",
        ],
      },
    ],
  },
  {
    company: "Alliance Professional Developers (APD)",
    description:
      "Software development company building web and mobile products for clients across financial services, logistics, and other industries.",
    roles: [
      {
        title: "Product Designer",
        dates: "Jul 2023 — May 2025",
        summary:
          "Owned end-to-end design across financial services, logistics, and operational products. Worked with founders, product managers, and engineers to define problems, shape requirements, and deliver web and mobile experiences.",
        details: [
          "Designed TR.ENERGY mobile workflows for transfers, staking, multiple accounts, and paid AML checks. Added risk scores and report freshness to wallet asset cards; the PM reported more successfully completed paid checks after release.",
          "Designed Crypto Office batch payouts covering funding, recipient entry, review, and draft saving. Added spreadsheet import and Google Sheets support based on feedback from 15 customer representatives working with teams of 50–100 people.",
          "Designed a CRM and customer-facing application for a logistics and freight business. Mapped user journeys and detailed flows to connect internal operations with customer needs and align requirements with product managers and engineers.",
          "Conducted 100+ usability testing sessions across my tenure at APD, evaluating workflows with customers and identifying interaction problems.",
          "Mentored two designers through weekly design reviews and supported engineers with interaction documentation and implementation feedback.",
        ],
      },
      {
        title: "UX/UI Designer",
        dates: "Dec 2020 — Jun 2023",
        summary:
          "Designed web and mobile interfaces for business software and consumer applications, translating requirements into user flows, prototypes, and detailed designs for development.",
        details: [
          "Designed 1,000+ screens across multiple projects, creating reusable UI components and responsive layouts to maintain consistency within each product.",
          "Structured navigation and screen flows through wireframes and interactive prototypes. Presented design rationale to product managers and stakeholders and refined solutions based on their feedback.",
          "Checked color contrast and keyboard interactions during design to support accessibility before developer handoff.",
          "Prepared developer handoffs specifying interface states and interaction behavior, resolving design details with engineers as technical constraints emerged.",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    description: null,
    roles: [
      {
        title: "UX/UI Designer",
        dates: "Apr 2017 — Dec 2020",
        summary:
          "Worked directly with small business owners in hospitality, retail, and creative industries, managing website design projects from initial brief through developer handoff.",
        details: [
          "Designed 30+ responsive websites, translating business goals into clear site structures, content hierarchies, and visual designs for desktop and mobile.",
          "Managed project scope and client feedback, prepared designs for development, and worked with developers to resolve implementation details.",
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
    tags: [
      "Complex workflow design",
      "System thinking",
      "Product discovery",
      "Interaction design",
      "Information architecture",
      "Design systems",
      "Prototyping",
      "User flows",
      "Technical documentation",
      "Product design",
      "Usability testing",
    ],
  },
  {
    title: "Design tools",
    tags: ["Figma", "FigJam", "Adobe Illustrator", "Rive", "Spline"],
  },
  {
    title: "AI-assisted development",
    tags: ["Figma agent", "ChatGPT", "Codex", "VS Code"],
    note: "Designed and built my portfolio with AI-assisted workflows using Next.js and Tailwind CSS, deployed on Vercel.",
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
                <p className="cv-caption">Bilbao, Spain • Open to remote opportunities and relocation.</p>
              </div>
            </div>
            <p className="cv-hero__description" style={typeStyle(typography.body.m)}>
              Senior Product Designer with 9+ years of experience across B2B and B2C web and mobile products,
              including scientific software and financial services. I turn complex requirements into clear
              workflows and reusable interface systems, owning design from discovery through implementation
              in close collaboration with product and engineering teams. My experience includes building
              analytical workspaces from the ground up, conducting customer usability testing, and translating
              research findings into interaction improvements.
            </p>
            <CvDownloadButton href={cvPdfHref} />
          </div>
        </div>
      </section>

      <CvSection id="cv-experience" title="Experience">
        {experience.map((company, index) => (
          <section key={company.company} aria-labelledby={`cv-company-${index}`}>
            <div className={`cv-row cv-company${company.description ? " cv-company--with-description" : ""}`}>
              <h3 id={`cv-company-${index}`} style={typeStyle(typography.heading.h4)}>{company.company}</h3>
            </div>
            {company.description ? (
              <div className="cv-company-description">
                <p style={typeStyle(typography.body.m)}>{company.description}</p>
              </div>
            ) : null}
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

      <CvSection id="cv-tools" title="Skills & technical competencies">
        {tools.map((group) => (
          <section className="cv-row cv-tool-group" key={group.title} aria-label={group.title}>
            <h3 style={typeStyle(typography.heading.h5)}>{group.title}</h3>
            <SkillTags tags={group.tags} />
            {group.note ? <div className="cv-tool-group__note"><AccentSummary>{group.note}</AccentSummary></div> : null}
          </section>
        ))}
      </CvSection>

      <CvSection id="cv-certifications" title="Certifications">
        <div className="cv-entries">
          {certifications.map((item) => (
            <CompactEntry key={item.title} title={item.title} caption={item.issuer} dates={item.dates} />
          ))}
        </div>
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
