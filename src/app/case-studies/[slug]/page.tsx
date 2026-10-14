import { notFound } from "next/navigation";
import { pageMetadata } from "@/app/seo";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import ArticleContent from "@/components/articles/ArticleContent";
import ArticleAnalytics from "@/components/articles/ArticleAnalytics";
import NavigationHeader from "@/components/ui/NavigationHeader";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import Footer from "@/components/ui/Footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return pageMetadata({ title: `${study.title} | Konstantin Alisov`, description: study.description, path: study.href, image: study.ogImage });
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return <>
    <NavigationHeader />
    <main className="case-study-page">
      <div className="case-study-page__article"><ArticleContent articleId={study.id} /></div>
      <div className="case-study-page__back"><ButtonSecondary href="/case-studies">Back to case studies</ButtonSecondary></div>
      <ArticleAnalytics id={study.id} title={study.title} />
    </main>
    <Footer />
  </>;
}
