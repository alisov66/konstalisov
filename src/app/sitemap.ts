import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/case-studies", "/cv", ...caseStudies.map((study) => study.href)]
    .map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
