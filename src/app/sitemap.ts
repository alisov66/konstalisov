import type { MetadataRoute } from "next";

import { capabilities } from "@/data/capabilities";
import { siteUrl } from "./seo";

const staticPaths = ["/", "/capabilities", "/about", "/contact", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths,
    ...capabilities.map(({ id }) => `/capabilities/${id}`),
  ].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
