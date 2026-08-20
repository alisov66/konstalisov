export const capabilities = [
  {
    id: "complex-workflow-design",
    label: "Complex workflow design",
    defaultArticle: "msa-workspace",
    articles: [
      {
        id: "msa-workspace",
        label: "MSA workspace",
        title: "Designing a workspace for complex sequence analysis",
        description:
          "Designing a flexible analysis workspace that helps researchers navigate dense biological data through adaptive layouts, visual controls, and contextual workflows.",
      },
      {
        id: "data-mapping",
        label: "Data mapping",
        title: "Transforming complex data mapping into a guided workflow",
        description:
          "Redesigning data mapping as a guided experience that helps researchers connect biological variables, understand compatibility, and configure workflows with confidence.",
      },
    ],
  },
  {
    id: "design-systems",
    label: "Design systems",
    defaultArticle: "scalable-header-architecture",
    articles: [
      {
        id: "scalable-header-architecture",
        label: "Application shell",
        title: "Designing a scalable application shell for complex workflows",
        description:
          "Creating a reusable header system that supports multiple product contexts, interactions, and workflows across Platforma applications.",
      },
    ],
  },
  {
    id: "documentation-collaboration",
    label: "Documentation & collaboration",
    defaultArticle: "complex-product-decisions",
    articles: [
      {
        id: "complex-product-decisions",
        label: "Product decisions",
        title: "Making complex product decisions understandable",
        description:
          "Turning product decisions, interaction logic, and technical requirements into clear documentation that aligns design, product, and engineering teams.",
      },
    ],
  },
  {
    id: "product-design-at-scale",
    label: "Product design at scale",
    defaultArticle: "platforma-product-platform",
    articles: [
      {
        id: "platforma-product-platform",
        label: "Platform evolution",
        title:
          "Scaling Platforma from startup website to enterprise product platform",
        description:
          "Restructuring a scientific software ecosystem into a coherent enterprise platform through information architecture, product communication, and strategic content design.",
      },
    ],
  },
  {
    id: "mobile-experiences",
    label: "Mobile experiences",
    defaultArticle: "tron-financial-operations",
    articles: [
      {
        id: "tron-financial-operations",
        label: "Financial workflows",
        title: "Simplifying complex financial operations for blockchain users",
        description:
          "Designing mobile financial experiences that help blockchain users manage transactions, accounts, and complex financial workflows with confidence.",
      },
    ],
  },
  {
    id: "design-to-production",
    label: "Design to production",
    defaultArticle: "portfolio-design-to-production",
    articles: [
      {
        id: "portfolio-design-to-production",
        label: "Portfolio workflow",
        title: "From design system to production with AI-assisted development",
        description:
          "Designing and building a production portfolio by connecting Figma systems, code components, AI-assisted development, and modern frontend workflows.",
      },
    ],
  },
] as const;

export type Capability = (typeof capabilities)[number];
export type CapabilityId = Capability["id"];
export type CapabilityArticle = Capability["articles"][number];
export type ArticleId = CapabilityArticle["id"];

export const defaultCapabilityId = capabilities[0].id;

export function getCapabilityById(id: string) {
  return capabilities.find((capability) => capability.id === id);
}

export function getArticleById(
  capability: Capability,
  articleId: string,
): CapabilityArticle | undefined {
  const articles: readonly CapabilityArticle[] = capability.articles;

  return articles.find((article) => article.id === articleId);
}
