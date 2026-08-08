import { notFound } from "next/navigation";

import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { pageMetadata } from "@/app/seo";
import {
  capabilities,
  getCapabilityById,
  type CapabilityId,
} from "@/data/capabilities";

export function generateStaticParams() {
  return capabilities.map((capability) => ({
    capability: capability.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ capability: string }>;
}) {
  const { capability } = await params;
  const selectedCapability = getCapabilityById(capability);

  if (!selectedCapability) {
    return {};
  }

  return pageMetadata({
    title: `${selectedCapability.label} | Konstantin Alisov`,
    description: selectedCapability.summary,
    path: `/capabilities/${selectedCapability.id}`,
    image: "/og/capabilities.png",
  });
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ capability: string }>;
}) {
  const { capability } = await params;
  const selectedCapability = getCapabilityById(capability);

  if (!selectedCapability) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <CapabilitiesSection
        scrollToArticleOnMount
        value={selectedCapability.id as CapabilityId}
      />
      <Footer />
    </main>
  );
}
