import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { pageMetadata } from "@/app/seo";

export const metadata = pageMetadata({
  title: "Capabilities | Konstantin Alisov",
  description:
    "Product design capabilities across complex workflows, design systems, documentation, product scale, and mobile experiences.",
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
