import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatementBand } from "@/components/sections/StatementBand";
import { Capabilities } from "@/components/sections/Capabilities";
import { Overview } from "@/components/sections/Overview";
import { Work } from "@/components/sections/Work";
import { site } from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  areaServed: "ZA",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
    addressRegion: "South Africa",
  },
  knowsAbout: [
    "Fintech engineering",
    "Payments and financial transaction systems",
    "Custom software platforms",
    "nopCommerce",
    "Systems and API integration",
    "AI and automation",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main id="top">
        <Hero />
        <StatementBand />
        <Capabilities />
        <Overview />
        <Work />
      </main>
    </>
  );
}
