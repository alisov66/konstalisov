import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import images from "@/data/case-study-images.json";
import { typography, typeStyle } from "@/styles";
import SelectionFrame from "./SelectionFrame";
import ThemeImage from "./ThemeImage";

export default function CaseStudyCard({ study, headingLevel = 3 }: { study: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const image = study.image ? images[study.slug as keyof typeof images] : undefined;
  const hoverImage = study.image ? images[`${study.slug}-hover` as keyof typeof images] : undefined;
  return (
    <Link href={study.href} className={`case-study-card case-study-card--${study.category}`} aria-labelledby={`card-${study.slug}`}>
      {image && (
        <div className="case-study-card__media">
          <div className="case-study-card__image">
            {/* The illustration repeats the linked title; keep the accessible name concise. */}
            <ThemeImage {...image} className="case-study-card__image-default" alt="" loading="lazy" decoding="async" sizes="auto, (max-width: 767px) calc(100vw - 56px), (max-width: 1439px) calc((100vw - 80px) / 2 - 40px), (max-width: 1727px) calc((100vw - 240px) / 4 - 80px), 292px" />
            {hoverImage && <ThemeImage {...hoverImage} className="case-study-card__image-hover" alt="" loading="lazy" decoding="async" sizes="auto, (max-width: 767px) calc(100vw - 56px), (max-width: 1439px) calc((100vw - 80px) / 2 - 32px), (max-width: 1727px) calc((100vw - 240px) / 4 - 40px), 332px" />}
            <SelectionFrame />
          </div>
        </div>
      )}
      <div className="case-study-card__copy">
        <Heading id={`card-${study.slug}`} style={typeStyle(typography.heading.h5)}>{study.cardTitle}</Heading>
        <p style={typeStyle(typography.body.s)}>{study.cardDescription}</p>
      </div>
      <span className="case-study-card__view" aria-hidden="true" style={typeStyle(typography.button.m)}>View →</span>
    </Link>
  );
}
