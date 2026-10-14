import { notFound, permanentRedirect } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ capability: study.capabilityId, article: study.id }));
}

export default async function LegacyArticlePage({ params }: {
  params: Promise<{ capability: string; article: string }>;
}) {
  const { capability, article } = await params;
  const study = caseStudies.find((item) => item.capabilityId === capability && item.id === article);
  if (!study) notFound();
  permanentRedirect(study.href);
}
