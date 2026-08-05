import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <AboutSection />
      <Footer />
    </main>
  );
}
