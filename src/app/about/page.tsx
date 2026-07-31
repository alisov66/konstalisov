import AboutSection from "@/components/sections/AboutSection";
import NavigationHeader from "@/components/ui/NavigationHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige-light)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <AboutSection />
    </main>
  );
}
