import type { CaseStudy } from "@/data/case-studies";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudyGrid({ studies, variant = "core", headingLevel = 3 }: {
  studies: readonly CaseStudy[];
  variant?: "core" | "featured" | "supporting";
  headingLevel?: 2 | 3;
}) {
  return <div className={`case-study-grid case-study-grid--${variant}`}>
    {studies.map((study) => <CaseStudyCard key={study.id} study={study} headingLevel={headingLevel} />)}
  </div>;
}
