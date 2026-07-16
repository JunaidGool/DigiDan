import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Portfolio } from "@/components/sections/Portfolio";
import { Harness } from "@/components/sections/Harness";
import { Leadership } from "@/components/sections/Leadership";
import { site } from "@/content/site";

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
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Approach />
        <Portfolio />
        <Harness />
        <Leadership />
      </main>
      <Footer />
    </>
  );
}
