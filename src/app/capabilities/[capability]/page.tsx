import { notFound } from "next/navigation";

import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import NavigationHeader from "@/components/ui/NavigationHeader";
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
    </main>
  );
}
