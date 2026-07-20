import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatementBand } from "@/components/sections/StatementBand";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Services } from "@/components/sections/Services";
import { Overview } from "@/components/sections/Overview";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { site, services, faq } from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Structured data graph: an Organization + WebSite + ProfessionalService (with a
 * service catalogue) and an FAQPage. Kept factual and in sync with the visible
 * copy, so search and answer engines get an accurate picture of the business.
 */
const orgId = `${site.url}/#organization`;
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      logo: `${site.url}/icon.svg`,
      image: `${site.url}/og.png`,
      areaServed: { "@type": "Country", name: "South Africa" },
      address: {
        "@type": "PostalAddress",
        addressCountry: "ZA",
        addressRegion: "South Africa",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        areaServed: "ZA",
        availableLanguage: "en",
      },
      knowsAbout: [
        "Custom software engineering",
        "E-commerce and nopCommerce development",
        "Systems, API and data integration",
        "AI and intelligent automation",
        "Cloud, resilience and operations",
        "Legacy system modernisation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": orgId },
      inLanguage: "en-ZA",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.legalName,
      url: site.url,
      description: site.description,
      provider: { "@id": orgId },
      areaServed: { "@type": "Country", name: "South Africa" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software engineering services",
        itemListElement: services.items.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.body,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <main id="top">
        <Hero />
        <StatementBand />
        <Ecosystem />
        <Services />
        <Overview />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
