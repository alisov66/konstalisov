import { notFound, permanentRedirect } from "next/navigation";
import { capabilities, getCapabilityById } from "@/data/capabilities";
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return capabilities.map((capability) => ({ capability: capability.id }));
}

export default async function LegacyCapabilityPage({ params }: { params: Promise<{ capability: string }> }) {
  const { capability } = await params;
  const selected = getCapabilityById(capability);
  if (!selected) notFound();
  const study = caseStudies.find((item) => item.id === selected.defaultArticle);
  if (!study) notFound();
  permanentRedirect(study.href);
}
