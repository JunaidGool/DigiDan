import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/portfolio";
import { notes } from "@/content/notes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/approach",
    "/notes",
    "/about",
    "/contact",
    "/security",
    "/privacy",
    "/products/war-room",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const caseStudies = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const fieldNotes = notes.map((n) => ({
    url: `${site.url}/notes/${n.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...caseStudies, ...fieldNotes];
}
