import type { Metadata } from "next";

export const siteUrl = new URL("https://konstantin-portfolio-five.vercel.app");

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Konstantin Alisov",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
