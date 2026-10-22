import { capabilities, type ArticleId } from "./capabilities";

type Presentation = {
  slug: string;
  category: "core" | "supporting" | "unlisted";
  order: number;
  cardTitle?: string;
  cardDescription?: string;
  image?: string;
  ogImage?: string;
};

const presentation: Record<ArticleId, Presentation> = {
  "data-mapping": {
    slug: "data-mapping", category: "core", order: 0,
    cardTitle: "Making data mapping easier to navigate",
    cardDescription: "Helping researchers connect data to charts with clearer variable choices, contextual suggestions, and compatibility guidance.",
    image: "/case-studies/data-mapping.webp",
  },
  "msa-workspace": {
    slug: "msa-workspace", category: "core", order: 1,
    cardTitle: "A flexible workspace for sequence analysis",
    cardDescription: "Giving researchers flexible analytical views and control over information density while keeping essential context in sight.",
    image: "/case-studies/msa-workspace.webp",
  },
  "mass-payout": {
    slug: "mass-payout", category: "core", order: 2,
    cardTitle: "Simplifying payouts to multiple recipients",
    cardDescription: "Helping teams import recipient lists from spreadsheets, review payout details, and pay multiple people in a single workflow.",
    image: "/case-studies/mass-payout.webp",
  },
  "tron-financial-operations": {
    slug: "aml", category: "core", order: 3,
    cardTitle: "Bringing AML checks into the wallet overview",
    cardDescription: "Making address risk and report freshness visible in the wallet, with optional AML controls to suit different user needs.",
    image: "/case-studies/aml.webp",
  },
  "portfolio-design-to-production": {
    slug: "portfolio-design-to-production", category: "supporting", order: 4,
    cardTitle: "Taking my portfolio from Figma to production with AI",
    cardDescription: "Designing, building, and maintaining a live website independently with ChatGPT and Codex, from initial design to release.",
  },
  "scalable-header-architecture": {
    slug: "scalable-header-architecture", category: "supporting", order: 5,
    cardTitle: "Unifying headers across Platforma’s workflows",
    cardDescription: "Creating a shared header component with clear usage rules across Platforma’s blocks, workspaces, dialogs, and sheets.",
  },
  "platforma-product-platform": {
    slug: "platforma-product-platform", category: "supporting", order: 6,
    cardTitle: "Adapting Platforma’s website for its audiences",
    cardDescription: "Designing and building a website that helps scientific and technical audiences explore Platforma and evaluate its fit.",
  },
  "portfolio-design-system": { slug: "portfolio-design-system", category: "unlisted", order: 7 },
  "complex-product-decisions": { slug: "complex-product-decisions", category: "unlisted", order: 8 },
  "block-subtitles": {
    slug: "block-subtitles", category: "supporting", order: 9,
    cardTitle: "Making similar analysis blocks easier to find",
    cardDescription: "Helping researchers identify and find the right analysis through automatic configuration subtitles and search, without opening blocks one by one.",
    ogImage: "/og/capabilities.png",
  },
};

export const caseStudies = capabilities.flatMap((capability) =>
  capability.articles.map((article) => {
    const card = presentation[article.id];
    return {
      ...article,
      ...card,
      capabilityId: capability.id,
      href: `/case-studies/${card.slug}`,
      legacyPath: `/capabilities/${capability.id}/${article.id}`,
      ogImage: card.ogImage ?? `/og/capabilities/${capability.id}/${article.id}.png`,
    };
  }),
).filter((study) => study.category !== "unlisted")
  .sort((a, b) => a.order - b.order);

export type CaseStudy = (typeof caseStudies)[number];
export const coreCaseStudies = caseStudies.filter((study) => study.category === "core");
export const supportingCaseStudies = caseStudies.filter((study) => study.category === "supporting");
export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
