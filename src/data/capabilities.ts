export const capabilities = [
  {
    id: "complex-workflow-design",
    label: "Complex workflow design",
    summary:
      "Designing adaptive interfaces that support expert workflows, dense information, and multiple ways of working",
  },
  {
    id: "design-systems",
    label: "Design systems",
    summary:
      "Building scalable component systems, interaction patterns, and foundations that improve consistency and speed",
  },
  {
    id: "documentation-collaboration",
    label: "Documentation & collaboration",
    summary:
      "Turning design decisions into shared understanding through clear documentation, specifications, and cross-functional collaboration.",
  },
  {
    id: "product-design-at-scale",
    label: "Product design at scale",
    summary:
      "Structuring complex products into coherent ecosystems through information architecture and product communication",
  },
  {
    id: "mobile-experiences",
    label: "Mobile experiences",
    summary:
      "Designing intuitive mobile experiences for financial products with complex user flows and high-frequency interactions",
  },
  {
    id: "design-to-production",
    label: "Design to production",
    summary:
      "Designing, building, and shipping a production portfolio through a shared design system and AI-assisted development workflow",
  },
] as const;

export type CapabilityId = (typeof capabilities)[number]["id"];

export const defaultCapabilityId = capabilities[0].id;

export function getCapabilityById(id: string) {
  return capabilities.find((capability) => capability.id === id);
}
