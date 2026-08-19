import { notFound } from "next/navigation";

import { pageMetadata } from "@/app/seo";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";
import {
  capabilities,
  getArticleById,
  getCapabilityById,
  type ArticleId,
  type CapabilityId,
} from "@/data/capabilities";

export function generateStaticParams() {
  return capabilities.flatMap((capability) =>
    capability.articles.map((article) => ({
      article: article.id,
      capability: capability.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string; capability: string }>;
}) {
  const { article, capability } = await params;
  const selectedCapability = getCapabilityById(capability);
  const selectedArticle = selectedCapability
    ? getArticleById(selectedCapability, article)
    : undefined;

  if (!selectedCapability || !selectedArticle) {
    return {};
  }

  const path = `/capabilities/${selectedCapability.id}/${selectedArticle.id}`;

  return pageMetadata({
    title: `${selectedArticle.title} | Konstantin Alisov`,
    description: selectedArticle.description,
    path,
    image: `/og${path}.png`,
  });
}

export default async function CapabilityArticlePage({
  params,
}: {
  params: Promise<{ article: string; capability: string }>;
}) {
  const { article, capability } = await params;
  const selectedCapability = getCapabilityById(capability);
  const selectedArticle = selectedCapability
    ? getArticleById(selectedCapability, article)
    : undefined;

  if (!selectedCapability || !selectedArticle) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <CapabilitiesSection
        articleId={selectedArticle.id as ArticleId}
        scrollToArticleOnMount
        value={selectedCapability.id as CapabilityId}
      />
      <Footer />
    </main>
  );
}
