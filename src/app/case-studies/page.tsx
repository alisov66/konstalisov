import { pageMetadata } from "@/app/seo";
import NavigationHeader from "@/components/ui/NavigationHeader";
import Footer from "@/components/ui/Footer";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import { coreCaseStudies, supportingCaseStudies } from "@/data/case-studies";
import { typography, typeStyle } from "@/styles";

export const metadata = pageMetadata({
  title: "Case Studies | Konstantin Alisov",
  description: "A selection of shipped product design projects, with the problems, design decisions, and iterations behind them.",
  path: "/case-studies",
  image: "/og/capabilities.png",
});

export default function CaseStudiesPage() {
  return <>
    <NavigationHeader />
    <main className="case-studies-page">
      <div className="page-container">
        <div className="section-title case-studies-page__title">
          <h1 style={typeStyle(typography.heading.h1)}>Case studies</h1>
          <p style={typeStyle(typography.body.m)}>A selection of shipped projects, with the problems, design decisions,<br className="desktop-break" /> and iterations behind them.</p>
        </div>
        <CaseStudyGrid studies={coreCaseStudies} headingLevel={2} />
        <section aria-labelledby="more-case-studies">
          <div className="more-studies-title"><h2 id="more-case-studies" style={typeStyle(typography.heading.h4)}>More case studies</h2></div>
          <CaseStudyGrid studies={supportingCaseStudies} variant="supporting" />
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
