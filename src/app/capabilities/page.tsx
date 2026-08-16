import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { pageMetadata } from "@/app/seo";

export const metadata = pageMetadata({
  title: "Product Design Capabilities | Konstantin Alisov",
  description:
    "Case studies across complex workflow design, design systems, documentation, product design at scale, mobile experiences, and design-to-production workflows.",
  path: "/capabilities",
  image: "/og/capabilities.png",
});

export default function CapabilitiesIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <CapabilitiesSection />
      <Footer />
    </main>
  );
}
