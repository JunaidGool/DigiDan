import type { MetadataRoute } from "next";
import { site } from "@/content/home";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow all crawlers, including AI answer-engine crawlers (GPTBot,
    // PerplexityBot, Google-Extended, etc.), so the site can be cited.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
