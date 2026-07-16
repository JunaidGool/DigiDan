import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Harness } from "@/components/sections/Harness";
import { Leadership } from "@/components/sections/Leadership";
import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  areaServed: "ZA",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
    addressRegion: "South Africa",
  },
  knowsAbout: [
    "Fintech engineering",
    "Custom software engineering",
    "AI harness engineering",
    "Systems and API integration",
    "nopCommerce",
    "Cloud and resilience engineering",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main id="main">
        <Hero />
        <Services />
        <Approach />
        <Portfolio />
        <Stats />
        <Harness />
        <Leadership />
      </main>
    </>
  );
}
