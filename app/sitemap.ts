import type { MetadataRoute } from "next";
import { site } from "@/content/home";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/work`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
