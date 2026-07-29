import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import NavigationHeader from "@/components/ui/NavigationHeader";

export default function CapabilitiesIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <CapabilitiesSection />
    </main>
  );
}
