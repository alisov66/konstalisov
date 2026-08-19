import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/seo/JsonLd";
import { siteUrl } from "./seo";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Konstantin Alisov | Product Designer",
  description:
    "Product designer specializing in complex workflows, design systems, enterprise software, and AI-assisted product development.",
  icons: {
    icon: isPreviewDeployment
      ? [
          {
            url: "/favicons/preview-icon.png",
            type: "image/png",
            sizes: "512x512",
          },
        ]
      : [
          { url: "/favicons/favicon.ico", type: "image/x-icon" },
          {
            url: "/favicons/icon.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
    apple: [
      {
        url: "/favicons/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Konstantin Alisov",
      jobTitle: "Product Designer",
      url: siteUrl.origin,
      sameAs: [
        "https://www.linkedin.com/in/konstantin-alisov/",
        "https://github.com/alisov66",
      ],
    },
    {
      "@type": "WebSite",
      name: "Konstantin Alisov",
      url: siteUrl.origin,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={structuredData} />
        {children}
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics debugMode={true} gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
