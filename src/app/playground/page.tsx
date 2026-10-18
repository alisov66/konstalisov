import type { Metadata } from "next";
import InteractiveDotGrid from "@/components/ui/InteractiveDotGrid";
import "./playground.css";

export const metadata: Metadata = {
  title: "Interactive grid | Konstantin Alisov",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return (
    <main className="grid-playground">
      <h1 className="sr-only">Interactive grid</h1>
      <InteractiveDotGrid />
    </main>
  );
}
