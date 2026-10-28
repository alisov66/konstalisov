import { pageMetadata } from "@/app/seo";
import NavigationHeader from "@/components/ui/NavigationHeader";
import Footer from "@/components/ui/Footer";
import HowIWorkSection from "@/components/sections/HowIWorkSection";
import { HomeHero, MyWorkSection, HomeAboutSection, GetInTouchSection } from "@/components/sections/HomeSections";

export const metadata = pageMetadata({
  title: "Konstantin Alisov | Product Designer",
  description: "Product designer specializing in complex workflows, design systems, enterprise software, and AI-assisted product development. Based in Bilbao, Spain.",
  path: "/",
  image: "/og/home.png",
});

export default function Home() {
  return (
    <>
      <NavigationHeader />
      <main><HomeHero /><MyWorkSection /><HowIWorkSection /><HomeAboutSection /><GetInTouchSection /></main>
      <Footer />
    </>
  );
}
