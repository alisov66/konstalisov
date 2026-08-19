import { notFound, redirect } from "next/navigation";

import { capabilities, getCapabilityById } from "@/data/capabilities";

export function generateStaticParams() {
  return capabilities.map((capability) => ({
    capability: capability.id,
  }));
}

export default async function CapabilityRedirectPage({
  params,
}: {
  params: Promise<{ capability: string }>;
}) {
  const { capability } = await params;
  const selectedCapability = getCapabilityById(capability);

  if (!selectedCapability) {
    notFound();
  }

  redirect(
    `/capabilities/${selectedCapability.id}/${selectedCapability.defaultArticle}`,
  );
}
