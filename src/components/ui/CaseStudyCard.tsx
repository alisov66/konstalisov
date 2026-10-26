import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import artworks from "@/data/case-study-artwork.json";
import { effects, typography, typeStyle } from "@/styles";
import CaseStudyArtwork from "./CaseStudyArtwork";

export default function CaseStudyCard({ study, headingLevel = 3 }: { study: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const artwork = artworks[study.slug as keyof typeof artworks];
  const texture = study.category === "core"
    ? { default: effects.texture.l1, hover: effects.texture.l2 }
    : { default: effects.texture.m1, hover: effects.texture.m2 };
  return (
    <Link href={study.href} className={`case-study-card case-study-card--${study.category}`} aria-labelledby={`card-${study.slug}`}>
      <div className="case-study-card__content">
        {artwork && (
          <div className="case-study-card__media">
            <CaseStudyArtwork artwork={artwork} texture={texture} />
          </div>
        )}
        <div className="case-study-card__copy">
          <p className="case-study-card__context" style={typeStyle(typography.body.xs)}>{study.cardContext}</p>
          <Heading id={`card-${study.slug}`} style={typeStyle(typography.heading.h5)}>{study.cardTitle}</Heading>
          <p style={typeStyle(typography.body.s)}>{study.cardDescription}</p>
        </div>
      </div>
      <span className="case-study-card__view" aria-hidden="true" style={typeStyle(typography.button.m)}>View →</span>
    </Link>
  );
}
