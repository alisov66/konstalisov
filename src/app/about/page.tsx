import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/ui/Footer";
import NavigationHeader from "@/components/ui/NavigationHeader";
import { pageMetadata } from "@/app/seo";

export const metadata = pageMetadata({
  title: "About | Konstantin Alisov",
  description:
    "About Konstantin Alisov, a product designer focused on complex systems and product clarity.",
  path: "/about",
  image: "/og/about.png",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <NavigationHeader alwaysVisible />
      <AboutSection />
      <Footer />
    </main>
  );
}
